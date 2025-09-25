import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  increment,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore'
import { db } from '@/config/firebase'
import type { Quote, Submission, ApiResponse, TodayQuoteResponse } from '../../shared/types'

// 컬렉션 참조
const quotesCollection = collection(db, 'quotes')
const submissionsCollection = collection(db, 'submissions')

// 오늘의 글 가져오기
export const getTodayQuote = async (): Promise<ApiResponse<TodayQuoteResponse>> => {
  try {
    // 현재 날짜
    const today = new Date().toISOString().split('T')[0]

    // 1. 먼저 오늘 이미 보여진 글이 있는지 확인
    const todayQuery = query(
      quotesCollection,
      where('last_shown_date', '==', today),
      where('status', '==', 'published'),
      limit(1)
    )

    let todayQuote: Quote | null = null
    const todaySnapshot = await getDocs(todayQuery)

    if (!todaySnapshot.empty) {
      // 오늘 이미 선정된 글이 있음
      const docData = todaySnapshot.docs[0].data()
      todayQuote = {
        id: todaySnapshot.docs[0].id,
        ...docData
      } as Quote
    } else {
      // 오늘의 글이 없으면 새로 선정
      // 100일 전 날짜 계산
      const hundredDaysAgo = new Date()
      hundredDaysAgo.setDate(hundredDaysAgo.getDate() - 100)
      const cutoffDate = hundredDaysAgo.toISOString().split('T')[0]

      // 100일 내에 노출되지 않은 글 또는 아직 노출된 적 없는 글 찾기
      const availableQuery = query(
        quotesCollection,
        where('status', '==', 'published'),
        orderBy('like_count', 'asc'), // 좋아요 적은 순으로
        limit(10)
      )

      const availableSnapshot = await getDocs(availableQuery)

      if (!availableSnapshot.empty) {
        // 랜덤하게 하나 선택
        const availableDocs = availableSnapshot.docs.filter(doc => {
          const data = doc.data()
          return !data.last_shown_date || data.last_shown_date < cutoffDate
        })

        if (availableDocs.length > 0) {
          const randomDoc = availableDocs[Math.floor(Math.random() * availableDocs.length)]
          const docData = randomDoc.data()

          // 오늘의 글로 설정
          await updateDoc(randomDoc.ref, {
            last_shown_date: today
          })

          todayQuote = {
            id: randomDoc.id,
            ...docData,
            last_shown_date: today
          } as Quote
        }
      }
    }

    if (!todayQuote) {
      throw new Error('표시할 글을 찾을 수 없습니다.')
    }

    // 다음 글들도 미리 준비 (선택사항)
    const nextQuery = query(
      quotesCollection,
      where('status', '==', 'published'),
      orderBy('like_count', 'desc'),
      limit(3)
    )

    const nextSnapshot = await getDocs(nextQuery)
    const nextQuotes = nextSnapshot.docs
      .filter(doc => doc.id !== todayQuote!.id)
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Quote))
      .slice(0, 2)

    return {
      success: true,
      data: {
        quote: todayQuote,
        next_quotes: nextQuotes
      }
    }
  } catch (error) {
    console.error('오늘의 글 가져오기 실패:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
    }
  }
}

// 다른 글 가져오기 (랜덤)
export const getRandomQuote = async (excludeId?: string): Promise<ApiResponse<Quote>> => {
  try {
    const randomQuery = query(
      quotesCollection,
      where('status', '==', 'published'),
      limit(20) // 20개 중에서 랜덤 선택
    )

    const snapshot = await getDocs(randomQuery)
    const docs = snapshot.docs.filter(doc => doc.id !== excludeId)

    if (docs.length === 0) {
      throw new Error('표시할 글을 찾을 수 없습니다.')
    }

    const randomDoc = docs[Math.floor(Math.random() * docs.length)]
    const quote: Quote = {
      id: randomDoc.id,
      ...randomDoc.data()
    } as Quote

    return {
      success: true,
      data: quote
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
    }
  }
}

// 공감하기 (좋아요)
export const likeQuote = async (quoteId: string): Promise<ApiResponse<{ like_count: number }>> => {
  try {
    const quoteRef = doc(db, 'quotes', quoteId)

    // 좋아요 수 증가
    await updateDoc(quoteRef, {
      like_count: increment(1)
    })

    // 업데이트된 좋아요 수 가져오기
    const updatedDoc = await getDoc(quoteRef)
    const data = updatedDoc.data()

    return {
      success: true,
      data: {
        like_count: data?.like_count || 0
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '좋아요 처리 중 오류가 발생했습니다.'
    }
  }
}

// 글 제출하기
export const submitQuote = async (content: string): Promise<ApiResponse<Submission>> => {
  try {
    const submission: Omit<Submission, 'id'> = {
      content: content.trim(),
      status: 'pending',
      created_at: new Date()
    }

    const docRef = await addDoc(submissionsCollection, submission)

    return {
      success: true,
      data: {
        id: docRef.id,
        ...submission
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '글 제출 중 오류가 발생했습니다.'
    }
  }
}

// 초기 데이터 추가 (개발용)
export const addInitialQuotes = async () => {
  const initialQuotes = [
    {
      type: 'quote',
      content: '가장 어두운 밤도 곧 끝날 것이다.',
      like_count: 0,
      status: 'published'
    },
    {
      type: 'text',
      content: '오늘도 수고하셨습니다. 당신이 있어서 세상이 더 따뜻해요.',
      like_count: 0,
      status: 'published'
    },
    {
      type: 'quote',
      content: '작은 진전도 진전이다. 포기하지 말고 계속 해보자.',
      like_count: 0,
      status: 'published'
    },
    {
      type: 'text',
      content: '완벽하지 않아도 괜찮아. 지금 이 순간의 당신도 충분히 소중해요.',
      like_count: 0,
      status: 'published'
    },
    {
      type: 'quote',
      content: '실패는 성공의 어머니다. 오늘의 실수가 내일의 지혜가 될 거야.',
      like_count: 0,
      status: 'published'
    }
  ]

  try {
    for (const quote of initialQuotes) {
      await addDoc(quotesCollection, quote)
    }
    console.log('초기 데이터 추가 완료')
  } catch (error) {
    console.error('초기 데이터 추가 실패:', error)
  }
}