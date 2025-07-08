
<template>
  <div class="container">
    <h1>福岡おでかけ提案ボット</h1>
    <form @submit.prevent="onSubmit">
      <div>
        <label>気分:
          <select v-model="mood">
            <option value="relax">リラックス</option>
            <option value="active">アクティブ</option>
            <option value="hungry">お腹がすいている</option>
            <option value="scenic">美しい景色</option>
            <option value="culture">文化体験</option>
          </select>
        </label>
      </div>
      <div>
        <label>エリア:
          <select v-model="area">
            <option value="hakata">博多</option>
            <option value="tenjin">天神</option>
            <option value="ohori">大濠公園</option>
            <option value="dazaifu">太宰府</option>
            <option value="nakasu">中洲</option>
            <option value="marinoa">マリノアシティ</option>
            <option value="momochi">百道浜</option>
            <option value="fukuokaTower">福岡タワー</option>
            <option value="uminoNakamichi">海の中道</option>
            <option value="yakuin">薬院</option>
          </select>
        </label>
      </div>
      <div>
        <label>予算:
          <select v-model="budget">
            <option value="low">1000円以下</option>
            <option value="medium">1000円〜5000円</option>
            <option value="high">5000円以上</option>
          </select>
        </label>
      </div>
      <div>
        <label>所要時間:
          <select v-model="duration">
            <option value="short">短時間</option>
            <option value="medium">数時間</option>
            <option value="long">一日中</option>
          </select>
        </label>
      </div>
    <div>
      <label>人数:
        <select v-model="people">
          <option value="1">1人</option>
          <option value="2">2人</option>
          <option value="3">3人</option>
          <option value="4">4人</option>
        </select>
      </label>
    </div>
      <button type="submit" :disabled="loading">提案をもらう</button>
    </form>
    <div v-if="loading">提案を生成中...</div>
    <div v-if="suggestion" class="suggestion">
      <h2>おすすめスポット</h2>
      <p>{{ suggestion }}</p>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const mood = ref('relax')
const area = ref('hakata')
const budget = ref('medium')
const duration = ref('medium')
const people = ref('1')
const suggestion = ref('')
const loading = ref(false)
const error = ref('')

function buildPrompt({ mood, area, budget, duration, people }: { mood: string; area: string; budget: string; duration: string; people: string }) {
  const moodMap: Record<string, string> = {
    relax: 'リラックスしたい',
    active: 'アクティブな体験を求めている',
    hungry: 'お腹がすいている',
    scenic: '美しい景色を楽しみたい',
    culture: '文化的な体験を求めている',
  }
  const budgetMap: Record<string, string> = {
    low: '1000円以下で',
    medium: '1000円から5000円で',
    high: '5000円以上で',
  }
  const durationMap: Record<string, string> = {
    short: '短時間で',
    medium: '数時間で',
    long: '一日中楽しめる',
  }
  return `ユーザーは福岡の「${area}」にいて、「${moodMap[mood]}」気分です。\n予算は${budgetMap[budget]}、所要時間は${durationMap[duration]}、人数は${people}人です。\nこの条件で行ける福岡のローカルスポットを1件、自然な日本語で紹介してください。\n説明は100文字以内で、やさしく語りかけるトーンでお願いします。`
}

async function onSubmit() {
  suggestion.value = ''
  error.value = ''
  loading.value = true
  try {
    const prompt = buildPrompt({ mood: mood.value, area: area.value, budget: budget.value, duration: duration.value, people: people.value })
    // OpenAI API呼び出し
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY || (window as any).OPENAI_API_KEY
    if (!apiKey) {
      throw new Error('OpenAI APIキーが設定されていません')
    }
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 200
      })
    })
    if (!res.ok) throw new Error('APIリクエストに失敗しました')
    const data = await res.json()
    suggestion.value = data.choices?.[0]?.message?.content?.trim() || '提案が生成できませんでした'
  } catch (e: any) {
    error.value = e.message || 'エラーが発生しました'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.container {
  max-width: 480px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px #0001;
}
form > div {
  margin-bottom: 1rem;
}
button {
  background: #42b983;
  color: #fff;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
}
.suggestion {
  margin-top: 2rem;
  background: #fff;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 1px 4px #0001;
}
.error {
  color: #c00;
  margin-top: 1rem;
}
</style>
