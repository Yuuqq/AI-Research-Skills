/**
 * Bilingual search keywords — keyed by `${categorySlug}/${skillSlug}`.
 * These extra terms get folded into the cmdk search value so a Chinese user
 * can find e.g. Chroma by searching "向量数据库", or Whisper by "语音识别".
 *
 * Add 2-5 natural terms per skill (mix of zh + extra en synonyms).
 * Skills not listed here still match by name/desc/tags + category label.
 */
export const skillKeywords: Record<string, string[]> = {
  // 01 model architecture
  "01-model-architecture/implementing-llms-litgpt": ["训练", "Lightning"],
  "01-model-architecture/mamba-architecture": ["状态空间", "长序列", "SSM"],
  "01-model-architecture/nanogpt": ["入门", "GPT 实现", "Karpathy"],
  "01-model-architecture/rwkv-architecture": ["线性注意力", "RNN", "长上下文"],
  "01-model-architecture/distributed-llm-pretraining-torchtitan": ["分布式", "预训练", "FSDP"],

  // 02 tokenization
  "02-tokenization/huggingface-tokenizers": ["分词", "子词", "BPE"],
  "02-tokenization/sentencepiece": ["分词", "子词"],

  // 03 fine-tuning
  "03-fine-tuning/axolotl": ["微调", "LoRA", "QLoRA"],
  "03-fine-tuning/llama-factory": ["微调", "SFT", "DPO"],
  "03-fine-tuning/peft-fine-tuning": ["参数高效微调", "LoRA"],
  "03-fine-tuning/unsloth": ["加速微调", "省显存", "VRAM"],

  // 04 mechanistic interpretability
  "04-mechanistic-interpretability/nnsight-remote-interpretability": ["可解释性", "干预"],
  "04-mechanistic-interpretability/pyvene-interventions": ["可解释性", "因果干预"],
  "04-mechanistic-interpretability/sparse-autoencoder-training": ["稀疏自编码器", "可解释性"],
  "04-mechanistic-interpretability/transformer-lens-interpretability": ["可解释性", "激活值", "残差流"],

  // 05 data processing
  "05-data-processing/nemo-curator": ["数据清洗", "去重", "过滤"],
  "05-data-processing/ray-data": ["分布式数据", "流式"],

  // 06 post-training
  "06-post-training/grpo-rl-training": ["强化学习", "RLHF"],
  "06-post-training/miles-rl-training": ["强化学习"],
  "06-post-training/openrlhf-training": ["RLHF", "强化学习"],
  "06-post-training/simpo-training": ["偏好对齐", "偏好学习"],
  "06-post-training/slime-rl-training": ["强化学习"],
  "06-post-training/torchforge-rl-training": ["强化学习"],
  "06-post-training/fine-tuning-with-trl": ["强化学习", "RLHF", "SFT"],
  "06-post-training/verl-rl-training": ["强化学习"],

  // 07 safety
  "07-safety-alignment/constitutional-ai": ["安全", "对齐"],
  "07-safety-alignment/llamaguard": ["安全", "内容审核"],
  "07-safety-alignment/nemo-guardrails": ["护栏", "安全"],
  "07-safety-alignment/prompt-guard": ["提示注入", "越狱"],

  // 08 distributed training
  "08-distributed-training/huggingface-accelerate": ["分布式"],
  "08-distributed-training/deepspeed": ["分布式", "ZeRO", "内存优化"],
  "08-distributed-training/training-llms-megatron": ["张量并行", "流水线并行"],
  "08-distributed-training/pytorch-fsdp2": ["分片", "数据并行"],
  "08-distributed-training/pytorch-lightning": ["训练框架"],
  "08-distributed-training/ray-train": ["分布式训练"],

  // 09 infrastructure
  "09-infrastructure/lambda-labs-gpu-cloud": ["GPU 云", "H100", "A100"],
  "09-infrastructure/modal-serverless-gpu": ["无服务器", "GPU"],
  "09-infrastructure/skypilot-multi-cloud-orchestration": ["多云", "GPU 调度"],

  // 10 optimization
  "10-optimization/awq-quantization": ["量化", "4比特"],
  "10-optimization/quantizing-models-bitsandbytes": ["量化", "8比特", "4比特"],
  "10-optimization/optimizing-attention-flash": ["注意力加速", "长上下文"],
  "10-optimization/gguf-quantization": ["量化格式", "llama.cpp"],
  "10-optimization/gptq": ["量化", "后训练"],
  "10-optimization/hqq-quantization": ["量化", "免校准"],
  "10-optimization/ml-training-recipes": ["训练技巧", "学习率"],

  // 11 evaluation
  "11-evaluation/evaluating-code-models": ["代码评估", "HumanEval"],
  "11-evaluation/evaluating-llms-harness": ["评估", "基准", "MMLU"],
  "11-evaluation/nemo-evaluator-sdk": ["评估"],

  // 12 inference & serving
  "12-inference-serving/llama-cpp": ["CPU 推理", "本地推理"],
  "12-inference-serving/ollama": ["本地大模型", "本地 LLM", "本地运行"],
  "12-inference-serving/sglang": ["高性能推理", "KV 缓存"],
  "12-inference-serving/tensorrt-llm": ["NVIDIA", "高吞吐"],
  "12-inference-serving/serving-llms-vllm": ["高吞吐", "推理服务", "PagedAttention"],

  // 13 mlops
  "13-mlops/mlflow": ["实验追踪", "模型管理"],
  "13-mlops/experiment-tracking-swanlab": ["实验追踪", "可视化"],
  "13-mlops/tensorboard": ["训练可视化"],
  "13-mlops/weights-and-biases": ["实验追踪", "可视化"],

  // 14 agents
  "14-agents/evolving-ai-agents": ["进化", "自改进"],
  "14-agents/autogpt-agents": ["自主智能体"],
  "14-agents/crewai-multi-agent": ["多智能体"],
  "14-agents/langchain": ["智能体框架", "工具调用", "检索增强"],
  "14-agents/llamaindex": ["数据框架", "检索增强"],
  "14-agents/openhands": ["自主编程", "AI 工程师"],

  // 15 rag
  "15-rag/chroma": ["向量数据库", "向量库", "嵌入"],
  "15-rag/faiss": ["相似度搜索", "向量检索"],
  "15-rag/haystack": ["搜索流水线", "检索增强"],
  "15-rag/pinecone": ["向量数据库", "托管"],
  "15-rag/qdrant-vector-search": ["向量搜索", "向量数据库"],
  "15-rag/sentence-transformers": ["句向量", "嵌入", "语义搜索"],

  // 16 prompt engineering
  "16-prompt-engineering/dspy": ["提示优化"],
  "16-prompt-engineering/guidance": ["受约束生成"],
  "16-prompt-engineering/instructor": ["结构化输出"],
  "16-prompt-engineering/outlines": ["结构化生成", "JSON"],

  // 17 observability
  "17-observability/langsmith-observability": ["观测", "追踪"],
  "17-observability/phoenix-observability": ["观测", "评估"],

  // 18 multimodal
  "18-multimodal/audiocraft-audio-generation": ["音频生成", "音乐生成"],
  "18-multimodal/blip-2-vision-language": ["视觉问答", "图文"],
  "18-multimodal/clip": ["图文模型", "零样本"],
  "18-multimodal/evaluating-cosmos-policy": ["机器人", "物理 AI"],
  "18-multimodal/llava": ["视觉语言", "多模态对话"],
  "18-multimodal/openpi": ["机器人", "VLA"],
  "18-multimodal/openvla-oft": ["机器人", "VLA", "LoRA"],
  "18-multimodal/segment-anything-model": ["图像分割"],
  "18-multimodal/stable-diffusion-image-generation": ["文生图", "图像生成", "扩散模型"],
  "18-multimodal/whisper": ["语音识别", "语音转文字", "转写", "字幕", "ASR"],

  // 19 emerging
  "19-emerging-techniques/knowledge-distillation": ["蒸馏", "模型压缩"],
  "19-emerging-techniques/long-context": ["长上下文", "RoPE"],
  "19-emerging-techniques/mergekit": ["模型合并"],
  "19-emerging-techniques/model-merging": ["模型合并"],
  "19-emerging-techniques/model-pruning": ["剪枝", "模型压缩"],
  "19-emerging-techniques/moe-training": ["混合专家"],
  "19-emerging-techniques/speculative-decoding": ["推测解码", "推理加速"],

  // 20 paper writing
  "20-ml-paper-writing/academic-plotting": ["学术绘图", "matplotlib"],
  "20-ml-paper-writing/ml-paper-writing": ["论文写作"],
  "20-ml-paper-writing/presenting-conference-talks": ["会议演讲", "演讲"],
  "20-ml-paper-writing/systems-paper-writing": ["系统论文", "MLSys"],

  // 21 ideation
  "21-research-ideation/brainstorming-research-ideas": ["头脑风暴", "选题"],
  "21-research-ideation/creative-thinking-for-research": ["创意思维", "假设"],

  // 0 autoresearch
  "0-autoresearch-skill/autoresearch": ["自主研究", "编排"],
};
