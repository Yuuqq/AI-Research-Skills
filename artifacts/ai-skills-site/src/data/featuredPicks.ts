import type { SkillKey } from "./skills";

export interface FeaturedPick {
  key: SkillKey;
  badge: { en: string; zh: string };
  plain: { en: string; zh: string };
}

export const featuredPicks: FeaturedPick[] = [
  {
    key: "12-inference-serving/serving-llms-vllm",
    badge: { en: "Production Standard", zh: "生产标配" },
    plain: {
      en: "Serve an AI model to many users at once, fast — what powers most AI apps in production.",
      zh: "让一个 AI 模型同时服务很多用户，速度快——大部分上线 AI 产品背后用的就是它。",
    },
  },
  {
    key: "06-post-training/grpo-rl-training",
    badge: { en: "Hot in 2025", zh: "2025 热门" },
    plain: {
      en: "A way to teach an AI to give better answers without needing humans to grade every response.",
      zh: "一种让 AI 学会更好回答的方法，不需要人工逐条打分。",
    },
  },
  {
    key: "01-model-architecture/mamba-architecture",
    badge: { en: "Beyond Transformers", zh: "超越 Transformer" },
    plain: {
      en: "A new AI architecture that handles very long text faster than the Transformers behind ChatGPT.",
      zh: "一种新的 AI 架构，处理超长文本比 ChatGPT 背后的 Transformer 更快。",
    },
  },
  {
    key: "18-multimodal/clip",
    badge: { en: "Foundational", zh: "基础必学" },
    plain: {
      en: "Match images and text — search a photo library with words, no labels needed.",
      zh: "把图片和文字关联起来——用一句话就能在图库里搜出对应照片，不用打标签。",
    },
  },
  {
    key: "03-fine-tuning/unsloth",
    badge: { en: "2x Faster", zh: "2 倍提速" },
    plain: {
      en: "Train an AI on your own data twice as fast, using a normal consumer GPU.",
      zh: "用一张普通显卡，把 AI 在你自己的数据上训练得快一倍。",
    },
  },
  {
    key: "14-agents/langchain",
    badge: { en: "Most Popular", zh: "最受欢迎" },
    plain: {
      en: "The most-used toolkit for building AI apps that read documents, call tools, and take actions.",
      zh: "构建 AI 应用最常用的工具箱：读文档、调工具、自己执行任务。",
    },
  },
];
