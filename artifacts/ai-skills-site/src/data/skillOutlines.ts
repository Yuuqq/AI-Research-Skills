import type { SkillKey } from "./skills";

export interface SkillOutline {
  what: { en: string; zh: string };
  how: { en: string[]; zh: string[] };
  workflow: { en: string[]; zh: string[] };
}

export const skillOutlines = {
  // ========== 01 MODEL ARCHITECTURE ==========
  "01-model-architecture/implementing-llms-litgpt": {
    what: {
      en: "Train and fine-tune 20+ LLM architectures (Llama, Mistral, Phi, Gemma) with a clean, hackable Lightning-AI codebase.",
      zh: "使用 Lightning AI 的简洁可修改代码库，训练并微调 20+ 种 LLM 架构（Llama、Mistral、Phi、Gemma）。",
    },
    how: {
      en: [
        "Single-file model implementations — each architecture is one readable Python file",
        "Built on Lightning Fabric for distributed multi-GPU / multi-node training",
        "Unified CLI for pretraining, LoRA/QLoRA, full fine-tuning, and DPO",
      ],
      zh: [
        "单文件模型实现——每种架构都是一个可完整阅读的 Python 文件",
        "基于 Lightning Fabric，开箱即用支持多 GPU 与多节点分布式训练",
        "统一 CLI 支持预训练、LoRA/QLoRA、全量微调与 DPO",
      ],
    },
    workflow: {
      en: [
        "litgpt download — fetch model weights from HuggingFace",
        "litgpt finetune lora — adapter fine-tune on your dataset",
        "litgpt evaluate — run benchmarks on the result",
        "litgpt serve — launch OpenAI-compatible inference",
      ],
      zh: [
        "litgpt download —— 从 HuggingFace 下载模型权重",
        "litgpt finetune lora —— 在数据集上做 LoRA 微调",
        "litgpt evaluate —— 对结果运行基准评估",
        "litgpt serve —— 启动 OpenAI 兼容的推理服务",
      ],
    },
  },
  "01-model-architecture/mamba-architecture": {
    what: {
      en: "State Space Model (SSM) for linear-time sequence modeling — challenges Transformer dominance with O(N) complexity.",
      zh: "状态空间模型（SSM），实现线性时间复杂度的序列建模，以 O(N) 复杂度挑战 Transformer 的主导地位。",
    },
    how: {
      en: [
        "Selective state space mechanism — input-dependent A, B, C, Δ parameters",
        "Hardware-aware parallel scan algorithm fuses recurrence into a single CUDA kernel",
        "No attention matrix — memory grows linearly, not quadratically with sequence length",
      ],
      zh: [
        "选择性状态空间机制——A、B、C、Δ 参数依赖于输入",
        "硬件友好的并行扫描算法将递归融合到单个 CUDA 核函数",
        "无需注意力矩阵——显存随序列长度线性增长，而非平方增长",
      ],
    },
    workflow: {
      en: [
        "Install mamba-ssm with CUDA build",
        "Initialize MambaLMHeadModel with d_model and n_layers",
        "Train with standard PyTorch loop and AdamW",
        "Generate via state caching for fast inference",
      ],
      zh: [
        "安装 mamba-ssm 并构建 CUDA 扩展",
        "初始化 MambaLMHeadModel，指定 d_model 和 n_layers",
        "用标准 PyTorch 循环和 AdamW 训练",
        "通过状态缓存进行快速推理",
      ],
    },
  },
  "01-model-architecture/nanogpt": {
    what: {
      en: "Karpathy's minimal GPT implementation — under 300 lines of PyTorch, designed for learning and rapid research.",
      zh: "Karpathy 的极简 GPT 实现——不到 300 行 PyTorch 代码，专为学习与快速研究而设计。",
    },
    how: {
      en: [
        "Standard decoder-only Transformer with causal masking and learned positional embeddings",
        "AdamW + cosine LR schedule + gradient accumulation for small-batch training",
        "DDP wrapper for multi-GPU; torch.compile for ~30% speedup on Ampere+",
      ],
      zh: [
        "标准 decoder-only Transformer，带因果掩码与可学习位置编码",
        "AdamW + 余弦学习率 + 梯度累积，适合小批量训练",
        "用 DDP 实现多 GPU；用 torch.compile 在 Ampere 及以上 GPU 加速约 30%",
      ],
    },
    workflow: {
      en: [
        "Prepare data with prepare.py — produces train.bin / val.bin",
        "Edit config.py to set model size and batch size",
        "Run train.py — checkpoints save to out/",
        "Run sample.py to generate text from a prompt",
      ],
      zh: [
        "用 prepare.py 准备数据——生成 train.bin / val.bin",
        "编辑 config.py 设置模型尺寸与批大小",
        "运行 train.py —— 检查点保存到 out/",
        "运行 sample.py 根据提示生成文本",
      ],
    },
  },
  "01-model-architecture/rwkv-architecture": {
    what: {
      en: "RNN-Transformer hybrid with linear attention, combining RNN inference efficiency with Transformer-level expressivity.",
      zh: "RNN 与 Transformer 混合架构，使用线性注意力，结合 RNN 推理效率与 Transformer 级别的表达能力。",
    },
    how: {
      en: [
        "Receptance Weighted Key Value mixes time-decay weights with key-value channels",
        "Trains in parallel like a Transformer, infers in O(1) per token like an RNN",
        "Constant memory footprint regardless of context length",
      ],
      zh: [
        "Receptance Weighted Key Value，将时间衰减权重与 key-value 通道相乘",
        "训练时像 Transformer 一样并行，推理时每个 token 仅 O(1) 复杂度，像 RNN",
        "无论上下文多长，显存占用恒定",
      ],
    },
    workflow: {
      en: [
        "pip install rwkv and download a community checkpoint",
        "Load model with PIPELINE strategy (cuda fp16 / cpu fp32)",
        "Stream tokens — state can be saved/restored for chat",
        "Optionally fine-tune with the LoRA-style RWKV trainer",
      ],
      zh: [
        "pip install rwkv 并下载社区检查点",
        "用 PIPELINE 策略加载模型（cuda fp16 / cpu fp32）",
        "流式生成 token —— 状态可保存/恢复用于多轮对话",
        "可选用 LoRA 风格的 RWKV 训练器进行微调",
      ],
    },
  },
  "01-model-architecture/distributed-llm-pretraining-torchtitan": {
    what: {
      en: "PyTorch-native distributed pretraining framework with FSDP2, tensor parallelism, and torch.compile out of the box.",
      zh: "PyTorch 原生的分布式预训练框架，开箱即用支持 FSDP2、张量并行与 torch.compile。",
    },
    how: {
      en: [
        "FSDP2 for fully-sharded data parallel with per-parameter sharding",
        "2D / 3D parallelism: combines DP + TP + PP via DeviceMesh",
        "Async checkpointing and selective activation checkpointing for memory savings",
      ],
      zh: [
        "FSDP2 实现按参数分片的完全数据并行",
        "二维/三维并行：通过 DeviceMesh 组合 DP + TP + PP",
        "异步检查点与选择性激活重计算，节省显存",
      ],
    },
    workflow: {
      en: [
        "Define model in train_configs/*.toml",
        "Launch with torchrun on multi-node cluster",
        "Monitor TensorBoard logs for loss / throughput",
        "Resume from distributed checkpoint when needed",
      ],
      zh: [
        "在 train_configs/*.toml 中定义模型",
        "在多节点集群上用 torchrun 启动",
        "通过 TensorBoard 监控损失与吞吐",
        "需要时从分布式检查点恢复",
      ],
    },
  },

  // ========== 02 TOKENIZATION ==========
  "02-tokenization/huggingface-tokenizers": {
    what: {
      en: "Train ultra-fast Rust-based tokenizers (BPE, WordPiece, Unigram) and integrate them with the Transformers ecosystem.",
      zh: "训练基于 Rust 的超快分词器（BPE、WordPiece、Unigram），并与 Transformers 生态无缝集成。",
    },
    how: {
      en: [
        "Pre-tokenizer + Model + Post-processor pipeline, each swappable",
        "Rust core with Python bindings — tokenizes 1GB of text in seconds",
        "Outputs tensors directly compatible with HuggingFace models",
      ],
      zh: [
        "由预分词器 + 模型 + 后处理器组成的管线，每个都可替换",
        "Rust 内核 + Python 绑定—— 1GB 文本数秒完成分词",
        "输出张量可直接用于 HuggingFace 模型",
      ],
    },
    workflow: {
      en: [
        "Initialize Tokenizer with BPE/WordPiece/Unigram model",
        "Train on a corpus with desired vocab_size",
        "Save as tokenizer.json (single-file format)",
        "Wrap with PreTrainedTokenizerFast for inference",
      ],
      zh: [
        "用 BPE/WordPiece/Unigram 模型初始化 Tokenizer",
        "在语料上以指定 vocab_size 训练",
        "保存为 tokenizer.json（单文件格式）",
        "用 PreTrainedTokenizerFast 包装供推理使用",
      ],
    },
  },
  "02-tokenization/sentencepiece": {
    what: {
      en: "Google's language-independent subword tokenizer that treats text as a raw byte stream — used in T5, LLaMA, Gemma.",
      zh: "Google 的语言无关子词分词器，将文本视为原始字节流——T5、LLaMA、Gemma 都在使用。",
    },
    how: {
      en: [
        "Treats whitespace as a normal character (▁) so detokenization is lossless",
        "Supports BPE and Unigram LM training algorithms",
        "Operates on raw text without language-specific preprocessing",
      ],
      zh: [
        "将空白字符视为普通字符（▁），保证分词可无损还原",
        "支持 BPE 与 Unigram LM 两种训练算法",
        "直接处理原始文本，无需语言相关的预处理",
      ],
    },
    workflow: {
      en: [
        "spm_train --input=corpus.txt --vocab_size=32000",
        "Inspect vocab — verify control symbols and coverage",
        "Use SentencePieceProcessor for encode / decode",
        "Export to HuggingFace tokenizer.json if needed",
      ],
      zh: [
        "spm_train --input=corpus.txt --vocab_size=32000",
        "检查词表——确认控制符号与覆盖率",
        "用 SentencePieceProcessor 做 encode / decode",
        "可导出为 HuggingFace tokenizer.json 格式",
      ],
    },
  },

  // ========== 03 FINE-TUNING ==========
  "03-fine-tuning/axolotl": {
    what: {
      en: "Streamlined fine-tuning framework — describe your training run in YAML and Axolotl handles the rest.",
      zh: "流线化的微调框架——用 YAML 描述训练任务，其余由 Axolotl 自动处理。",
    },
    how: {
      en: [
        "YAML config controls model, dataset, LoRA/QLoRA, optimizer, and parallelism",
        "Auto-applies prompt templates (Alpaca, ShareGPT, ChatML, custom)",
        "Built-in DeepSpeed ZeRO-3 and FSDP integration for big models",
      ],
      zh: [
        "YAML 配置控制模型、数据集、LoRA/QLoRA、优化器与并行策略",
        "自动套用提示模板（Alpaca、ShareGPT、ChatML 或自定义）",
        "内置 DeepSpeed ZeRO-3 与 FSDP，可训练超大模型",
      ],
    },
    workflow: {
      en: [
        "Pick a base config from examples/",
        "Edit datasets path and base_model",
        "accelerate launch -m axolotl.cli.train config.yml",
        "Merge LoRA adapter and push to HuggingFace Hub",
      ],
      zh: [
        "从 examples/ 选一个基础配置",
        "编辑 datasets 路径和 base_model",
        "accelerate launch -m axolotl.cli.train config.yml",
        "合并 LoRA 适配器并推送到 HuggingFace Hub",
      ],
    },
  },
  "03-fine-tuning/llama-factory": {
    what: {
      en: "One-stop fine-tuning toolkit for 100+ LLMs covering SFT, DPO, ORPO, KTO, and reward modeling, with a web UI.",
      zh: "一站式微调工具包，支持 100+ LLM 的 SFT、DPO、ORPO、KTO 与奖励建模，并自带 Web 界面。",
    },
    how: {
      en: [
        "LlamaBoard web UI lets you configure runs without writing YAML",
        "Unified trainer abstracts away algorithm differences",
        "Supports flash-attn, unsloth-style speedups, and QLoRA across all 100+ models",
      ],
      zh: [
        "LlamaBoard Web 界面无需写 YAML 即可配置训练",
        "统一的训练器抽象屏蔽算法差异",
        "在 100+ 模型上支持 flash-attn、unsloth 风格加速与 QLoRA",
      ],
    },
    workflow: {
      en: [
        "llamafactory-cli webui — open the visual config",
        "Pick model, dataset, training stage (SFT/DPO/...)",
        "Click Start — monitor loss curves live",
        "Export merged model or push adapter to Hub",
      ],
      zh: [
        "llamafactory-cli webui —— 打开可视化配置",
        "选择模型、数据集、训练阶段（SFT/DPO/...）",
        "点击 Start —— 实时查看 loss 曲线",
        "导出合并模型或将适配器推送到 Hub",
      ],
    },
  },
  "03-fine-tuning/peft-fine-tuning": {
    what: {
      en: "HuggingFace's parameter-efficient fine-tuning library: LoRA, QLoRA, Prefix Tuning, IA³, AdaLoRA — train <1% of weights.",
      zh: "HuggingFace 的参数高效微调库：LoRA、QLoRA、Prefix Tuning、IA³、AdaLoRA —— 仅训练不到 1% 的权重。",
    },
    how: {
      en: [
        "Wraps any Transformers model — model = get_peft_model(model, peft_config)",
        "Adapter weights save as ~50MB instead of 14GB+ for the full model",
        "Works seamlessly with Trainer, Accelerate, DeepSpeed, FSDP",
      ],
      zh: [
        "包装任意 Transformers 模型 —— model = get_peft_model(model, peft_config)",
        "适配器权重仅约 50MB，而完整模型可达 14GB 以上",
        "与 Trainer、Accelerate、DeepSpeed、FSDP 无缝兼容",
      ],
    },
    workflow: {
      en: [
        "Define LoraConfig (r, alpha, target_modules)",
        "Wrap model and check trainable params (<1%)",
        "Train with standard Trainer or custom loop",
        "Merge with model.merge_and_unload() for deployment",
      ],
      zh: [
        "定义 LoraConfig（r、alpha、target_modules）",
        "包装模型并查看可训练参数比例（<1%）",
        "用标准 Trainer 或自定义循环训练",
        "通过 model.merge_and_unload() 合并以便部署",
      ],
    },
  },
  "03-fine-tuning/unsloth": {
    what: {
      en: "2x faster fine-tuning with 70% less VRAM via custom CUDA kernels — fits Llama-3 70B QLoRA on a single 48GB GPU.",
      zh: "通过自定义 CUDA 核函数实现 2 倍速度、降低 70% 显存的微调 —— 单张 48GB GPU 即可对 Llama-3 70B 做 QLoRA。",
    },
    how: {
      en: [
        "Hand-written Triton kernels for RoPE, RMSNorm, Cross-Entropy",
        "4-bit quantization via bitsandbytes integrated with LoRA",
        "Drop-in replacement: FastLanguageModel.from_pretrained(...)",
      ],
      zh: [
        "为 RoPE、RMSNorm、Cross-Entropy 手写 Triton 核函数",
        "通过 bitsandbytes 集成 4-bit 量化与 LoRA",
        "可直接替换：FastLanguageModel.from_pretrained(...)",
      ],
    },
    workflow: {
      en: [
        "from unsloth import FastLanguageModel and load model",
        "Apply get_peft_model with LoRA targets",
        "Train via standard SFTTrainer from TRL",
        "Save with save_pretrained_merged in GGUF / HF format",
      ],
      zh: [
        "from unsloth import FastLanguageModel 并加载模型",
        "应用 get_peft_model 设置 LoRA 目标层",
        "通过 TRL 的标准 SFTTrainer 训练",
        "用 save_pretrained_merged 保存为 GGUF / HF 格式",
      ],
    },
  },

  // ========== 04 INTERPRETABILITY ==========
  "04-mechanistic-interpretability/nnsight-remote-interpretability": {
    what: {
      en: "Remote interpretability — run interventions on 70B+ models hosted on the NDIF cluster from your laptop.",
      zh: "远程可解释性——从自己的笔记本对 NDIF 集群上托管的 70B+ 模型进行干预。",
    },
    how: {
      en: [
        "Trace context records the computation graph of any forward pass",
        "Save / set / swap activations at any layer with simple Python syntax",
        "Operations execute remotely on big iron; results stream back as tensors",
      ],
      zh: [
        "Trace 上下文记录任意前向传播的计算图",
        "用简洁的 Python 语法在任意层保存/设置/替换激活",
        "操作在远程大算力机器执行，结果以张量流回",
      ],
    },
    workflow: {
      en: [
        "model = LanguageModel('meta-llama/Llama-3-70b', remote=True)",
        "with model.trace(prompt) as runner: capture activations",
        "Modify or replace activations and re-run",
        "Compare logit outputs to study circuit behavior",
      ],
      zh: [
        "model = LanguageModel('meta-llama/Llama-3-70b', remote=True)",
        "with model.trace(prompt) as runner: 捕获激活",
        "修改或替换激活后重跑",
        "对比 logit 输出，研究电路行为",
      ],
    },
  },
  "04-mechanistic-interpretability/pyvene-interventions": {
    what: {
      en: "Causal intervention library for PyTorch models — supports distributed alignment search and counterfactual analysis.",
      zh: "用于 PyTorch 模型的因果干预库——支持分布式对齐搜索与反事实分析。",
    },
    how: {
      en: [
        "Define intervention sites declaratively (layer, head, position)",
        "Run interchange interventions: swap activations between two prompts",
        "Train low-rank rotations to find aligned causal subspaces",
      ],
      zh: [
        "声明式定义干预位置（层、头、位置）",
        "运行交换干预：在两个提示之间替换激活",
        "训练低秩旋转矩阵，寻找对齐的因果子空间",
      ],
    },
    workflow: {
      en: [
        "Wrap model with IntervenableModel and config",
        "Specify base + source prompts and intervention sites",
        "Compute intervention loss vs. desired counterfactual",
        "Analyze which subspaces carry the causal information",
      ],
      zh: [
        "用 IntervenableModel 与 config 包装模型",
        "指定 base + source 提示与干预位置",
        "计算干预损失与目标反事实之间的差异",
        "分析哪些子空间承载了因果信息",
      ],
    },
  },
  "04-mechanistic-interpretability/sparse-autoencoder-training": {
    what: {
      en: "Train Sparse Autoencoders (SAEs) on LLM activations to decompose them into monosemantic interpretable features.",
      zh: "在 LLM 激活上训练稀疏自编码器（SAE），将激活分解为单语义、可解释的特征。",
    },
    how: {
      en: [
        "Encoder: linear projection from d_model → d_dictionary (8x to 64x larger)",
        "L1 sparsity penalty forces most features to be zero per token",
        "Decoder reconstructs original activation from active features",
      ],
      zh: [
        "编码器：从 d_model 线性投影到 d_dictionary（8 倍到 64 倍更大）",
        "L1 稀疏惩罚强制每个 token 上大多数特征为零",
        "解码器从激活的特征重建原始激活",
      ],
    },
    workflow: {
      en: [
        "Cache model activations at the chosen hook point",
        "Train SAE with reconstruction + L1 loss until L0 ≈ 50",
        "Use sae-lens dashboards to label features",
        "Steer model behavior by clamping features to fixed values",
      ],
      zh: [
        "在指定 hook 点缓存模型激活",
        "用重建 + L1 损失训练 SAE，直到 L0 ≈ 50",
        "用 sae-lens 仪表盘对特征打标签",
        "通过钳制特征值引导模型行为",
      ],
    },
  },
  "04-mechanistic-interpretability/transformer-lens-interpretability": {
    what: {
      en: "Library of pre-loaded models with rich hook points for residual stream analysis, activation patching, and circuit discovery.",
      zh: "预加载模型库，提供丰富 hook 点用于残差流分析、激活修补与电路发现。",
    },
    how: {
      en: [
        "HookedTransformer exposes attention patterns, head outputs, MLP outputs at every layer",
        "run_with_cache returns logits + dict of all intermediate tensors",
        "run_with_hooks lets you inject ablations / patches inline",
      ],
      zh: [
        "HookedTransformer 在每一层暴露注意力模式、注意力头输出与 MLP 输出",
        "run_with_cache 返回 logits 加所有中间张量字典",
        "run_with_hooks 可在前向中注入消融或修补操作",
      ],
    },
    workflow: {
      en: [
        "model = HookedTransformer.from_pretrained('gpt2-small')",
        "logits, cache = model.run_with_cache(prompt)",
        "Patch a clean activation into a corrupted run",
        "Measure logit difference → identify causal heads",
      ],
      zh: [
        "model = HookedTransformer.from_pretrained('gpt2-small')",
        "logits, cache = model.run_with_cache(prompt)",
        "把干净激活修补到一次受损前向中",
        "测量 logit 差异 → 识别因果头",
      ],
    },
  },

  // ========== 05 DATA PROCESSING ==========
  "05-data-processing/nemo-curator": {
    what: {
      en: "GPU-accelerated data curation for LLM pretraining — exact/fuzzy dedup, quality filtering, PII redaction at terabyte scale.",
      zh: "GPU 加速的 LLM 预训练数据治理——支持 TB 级精确/模糊去重、质量过滤与 PII 脱敏。",
    },
    how: {
      en: [
        "Built on RAPIDS cuDF for GPU-native DataFrame ops",
        "Distributed via Dask across multi-node clusters",
        "MinHash LSH for fuzzy dedup; FastText classifier for quality scoring",
      ],
      zh: [
        "基于 RAPIDS cuDF 实现 GPU 原生 DataFrame 操作",
        "通过 Dask 在多节点集群上分布式执行",
        "用 MinHash LSH 做模糊去重；用 FastText 分类器评分质量",
      ],
    },
    workflow: {
      en: [
        "Load Common Crawl / custom corpus into DocumentDataset",
        "Apply ExactDuplicates → FuzzyDuplicates → Modify",
        "Filter via QualityClassifier and PII Redactor",
        "Write back to JSONL/Parquet for training",
      ],
      zh: [
        "将 Common Crawl 或自定义语料加载为 DocumentDataset",
        "依次应用 ExactDuplicates → FuzzyDuplicates → Modify",
        "通过 QualityClassifier 与 PII Redactor 过滤",
        "回写为 JSONL/Parquet 供训练使用",
      ],
    },
  },
  "05-data-processing/ray-data": {
    what: {
      en: "Distributed data processing for ML — lazy evaluation, streaming execution, and GPU transforms across heterogeneous clusters.",
      zh: "面向 ML 的分布式数据处理——支持惰性求值、流式执行与跨异构集群的 GPU 转换。",
    },
    how: {
      en: [
        "Dataset is a sequence of blocks distributed across the Ray cluster",
        "Lazy operators — map_batches, filter, repartition — fuse into pipelines",
        "Auto-batching streams data into PyTorch / TensorFlow training loops",
      ],
      zh: [
        "Dataset 是一组分布在 Ray 集群上的块",
        "惰性算子 —— map_batches、filter、repartition —— 自动融合为管线",
        "自动批处理将数据流式输入 PyTorch / TensorFlow 训练循环",
      ],
    },
    workflow: {
      en: [
        "ds = ray.data.read_parquet('s3://bucket/data/')",
        "ds = ds.map_batches(transform, num_gpus=1)",
        "ds.iter_torch_batches(batch_size=32) inside trainer",
        "Materialize or write back when needed",
      ],
      zh: [
        "ds = ray.data.read_parquet('s3://bucket/data/')",
        "ds = ds.map_batches(transform, num_gpus=1)",
        "在训练器中调用 ds.iter_torch_batches(batch_size=32)",
        "需要时物化或写回",
      ],
    },
  },

  // ========== 06 POST-TRAINING ==========
  "06-post-training/grpo-rl-training": {
    what: {
      en: "Group Relative Policy Optimization — efficient RLHF without a critic model, used to train DeepSpeek-R1.",
      zh: "Group Relative Policy Optimization —— 不需要 critic 模型的高效 RLHF，被 DeepSeek-R1 用于训练。",
    },
    how: {
      en: [
        "Sample G completions per prompt; compute reward for each",
        "Advantage = (reward - group_mean) / group_std — no value network needed",
        "Standard PPO clipped objective applied to each completion",
      ],
      zh: [
        "对每个提示采样 G 个补全；为每个计算奖励",
        "优势 = (奖励 - 组均值) / 组标准差 —— 无需价值网络",
        "对每个补全应用标准 PPO 截断目标函数",
      ],
    },
    workflow: {
      en: [
        "Define a reward function (e.g., math correctness checker)",
        "Configure GRPOTrainer with G=8 completions",
        "Train — policy improves via group-relative ranking",
        "Evaluate on held-out reasoning benchmarks",
      ],
      zh: [
        "定义奖励函数（例如数学正确性判定器）",
        "配置 GRPOTrainer，G=8 个补全",
        "训练 —— 策略通过组内相对排名改进",
        "在保留的推理基准上评估",
      ],
    },
  },
  "06-post-training/miles-rl-training": {
    what: {
      en: "Multi-step interleaved learning for RL post-training — alternates supervised and RL phases for stable convergence.",
      zh: "多步交错学习的 RL 后训练框架——通过交替进行监督与 RL 阶段实现稳定收敛。",
    },
    how: {
      en: [
        "Interleaves SFT updates with PPO/GRPO steps to prevent reward hacking",
        "Adaptive KL control keeps the policy close to the reference",
        "Curriculum-style task scheduling across reasoning domains",
      ],
      zh: [
        "在 PPO/GRPO 步之间穿插 SFT 更新，防止奖励黑客",
        "自适应 KL 控制保持策略接近参考模型",
        "跨推理领域的课程式任务调度",
      ],
    },
    workflow: {
      en: [
        "Prepare SFT data + reward function for each task",
        "Run miles train --config config.yaml",
        "Monitor reward, KL divergence, and SFT loss together",
        "Export final policy to HuggingFace format",
      ],
      zh: [
        "为每个任务准备 SFT 数据与奖励函数",
        "运行 miles train --config config.yaml",
        "同时监控奖励、KL 散度与 SFT 损失",
        "将最终策略导出为 HuggingFace 格式",
      ],
    },
  },
  "06-post-training/openrlhf-training": {
    what: {
      en: "Scalable RLHF framework supporting PPO, DPO, GRPO, and KTO on 70B+ models with Ray and DeepSpeed.",
      zh: "可扩展的 RLHF 框架，支持在 70B+ 模型上运行 PPO、DPO、GRPO、KTO，基于 Ray 与 DeepSpeed。",
    },
    how: {
      en: [
        "Ray actors host Actor/Critic/Reward/Reference models on separate GPU pools",
        "vLLM accelerates rollout generation by 10x",
        "DeepSpeed ZeRO-3 + offloading for actor/critic training",
      ],
      zh: [
        "Ray actor 在独立 GPU 池中托管 Actor/Critic/Reward/Reference 模型",
        "vLLM 将 rollout 生成加速 10 倍",
        "DeepSpeed ZeRO-3 + 卸载用于 actor/critic 训练",
      ],
    },
    workflow: {
      en: [
        "Train reward model with train_rm.py",
        "Run train_ppo_ray.py with Ray cluster",
        "Tune rollout_batch_size and KL coefficient",
        "Export aligned model checkpoint",
      ],
      zh: [
        "用 train_rm.py 训练奖励模型",
        "在 Ray 集群上运行 train_ppo_ray.py",
        "调优 rollout_batch_size 与 KL 系数",
        "导出对齐后的模型检查点",
      ],
    },
  },
  "06-post-training/simpo-training": {
    what: {
      en: "SimPO — reference-free DPO variant with length-normalized rewards. Outperforms DPO on chat benchmarks at lower cost.",
      zh: "SimPO —— 不需要参考模型的 DPO 变体，使用长度归一化奖励。在聊天基准上以更低成本超越 DPO。",
    },
    how: {
      en: [
        "Removes reference model requirement → saves ~50% memory",
        "Implicit reward = average log-prob of response (length-normalized)",
        "Adds margin γ to enforce gap between chosen and rejected",
      ],
      zh: [
        "去除参考模型 → 节省约 50% 显存",
        "隐式奖励 = 响应的平均对数概率（按长度归一化）",
        "加入 margin γ，强制 chosen 与 rejected 之间的差距",
      ],
    },
    workflow: {
      en: [
        "Prepare preference dataset (chosen / rejected pairs)",
        "Set CPOConfig with loss_type='simpo' and beta, gamma",
        "Train via TRL's CPOTrainer",
        "Evaluate on AlpacaEval / Arena-Hard",
      ],
      zh: [
        "准备偏好数据集（chosen / rejected 对）",
        "设置 CPOConfig，loss_type='simpo'，并配置 beta、gamma",
        "通过 TRL 的 CPOTrainer 训练",
        "在 AlpacaEval / Arena-Hard 上评估",
      ],
    },
  },
  "06-post-training/slime-rl-training": {
    what: {
      en: "Scalable language-model RL training with efficient async rollout — designed for very large reasoning runs.",
      zh: "可扩展的语言模型 RL 训练框架，支持高效异步 rollout —— 专为超大规模推理训练设计。",
    },
    how: {
      en: [
        "Decouples rollout workers from trainer workers via async queue",
        "Trainer never waits for rollouts → near-100% GPU utilization",
        "Built-in support for tool-augmented reasoning trajectories",
      ],
      zh: [
        "通过异步队列将 rollout worker 与训练 worker 解耦",
        "训练器无需等待 rollout —— GPU 利用率接近 100%",
        "内置对工具增强推理轨迹的支持",
      ],
    },
    workflow: {
      en: [
        "Configure rollout cluster size and trainer cluster size",
        "Define environment + reward model",
        "Launch slime train — monitor lag between queues",
        "Snapshot policy at convergence",
      ],
      zh: [
        "配置 rollout 集群与训练集群规模",
        "定义环境与奖励模型",
        "启动 slime train —— 监控队列间延迟",
        "在收敛时快照策略",
      ],
    },
  },
  "06-post-training/torchforge-rl-training": {
    what: {
      en: "PyTorch-native RL training with modular reward and rollout components — designed to feel like writing standard PyTorch.",
      zh: "PyTorch 原生的 RL 训练框架，奖励与 rollout 模块化——使用体验如同编写标准 PyTorch。",
    },
    how: {
      en: [
        "Composable Trajectory class wraps observations, actions, rewards, log-probs",
        "Pluggable rollout backends: vLLM, SGLang, native generate",
        "Standard nn.Module reward models — train or load any HF checkpoint",
      ],
      zh: [
        "可组合的 Trajectory 类，封装观测、动作、奖励、log_prob",
        "可插拔的 rollout 后端：vLLM、SGLang、原生 generate",
        "标准 nn.Module 奖励模型 —— 训练或加载任意 HF 检查点",
      ],
    },
    workflow: {
      en: [
        "Define environment, policy, reward modules",
        "Pick algorithm class (PPO, GRPO, DPO)",
        "trainer.fit(num_iterations=N)",
        "Save final policy via standard torch.save",
      ],
      zh: [
        "定义环境、策略、奖励模块",
        "选择算法类（PPO、GRPO、DPO）",
        "trainer.fit(num_iterations=N)",
        "用标准 torch.save 保存最终策略",
      ],
    },
  },
  "06-post-training/fine-tuning-with-trl": {
    what: {
      en: "HuggingFace's Transformer RL library — the de-facto toolkit for SFT, DPO, PPO, GRPO, ORPO, KTO, and reward modeling.",
      zh: "HuggingFace 的 Transformer RL 库 —— SFT、DPO、PPO、GRPO、ORPO、KTO 与奖励建模的事实标准工具集。",
    },
    how: {
      en: [
        "Trainer subclasses (SFTTrainer, DPOTrainer, …) extend HF Trainer API",
        "Native PEFT integration — every trainer accepts peft_config",
        "Auto-handles chat templates, padding, completion-only loss",
      ],
      zh: [
        "Trainer 子类（SFTTrainer、DPOTrainer……）扩展 HF Trainer API",
        "原生集成 PEFT —— 每个 trainer 都可接收 peft_config",
        "自动处理聊天模板、填充与仅响应部分损失",
      ],
    },
    workflow: {
      en: [
        "Pick trainer class for your stage (SFT → DPO → PPO)",
        "Pass model, tokenizer, dataset, training args",
        "trainer.train() — checkpoints save automatically",
        "Push to Hub or merge LoRA before deploying",
      ],
      zh: [
        "为当前阶段选 trainer 类（SFT → DPO → PPO）",
        "传入模型、分词器、数据集、训练参数",
        "trainer.train() —— 检查点自动保存",
        "推送到 Hub 或在部署前合并 LoRA",
      ],
    },
  },
  "06-post-training/verl-rl-training": {
    what: {
      en: "Volcano Engine RL framework for large-scale post-training with hybrid 5D parallelism.",
      zh: "字节火山引擎的 RL 框架，支持混合 5D 并行的大规模后训练。",
    },
    how: {
      en: [
        "HybridFlow programming model separates control flow from data flow",
        "5D parallelism: data, tensor, pipeline, sequence, expert",
        "Co-locates actor / critic / rollout for max GPU utilization",
      ],
      zh: [
        "HybridFlow 编程模型将控制流与数据流分离",
        "5D 并行：数据、张量、流水线、序列、专家",
        "actor / critic / rollout 共址部署，最大化 GPU 利用率",
      ],
    },
    workflow: {
      en: [
        "Define ray-based ResourcePoolManager",
        "Configure rollout (vLLM/SGLang) and training engines",
        "Run verl.trainer.main_ppo with config.yaml",
        "Scale to 100B+ models across hundreds of GPUs",
      ],
      zh: [
        "定义基于 Ray 的 ResourcePoolManager",
        "配置 rollout（vLLM/SGLang）与训练引擎",
        "运行 verl.trainer.main_ppo --config config.yaml",
        "可扩展到数百块 GPU 的 100B+ 模型",
      ],
    },
  },

  // ========== 07 SAFETY & ALIGNMENT ==========
  "07-safety-alignment/constitutional-ai": {
    what: {
      en: "Anthropic's CAI — train safe AI by having it critique and revise its own outputs against a written constitution.",
      zh: "Anthropic 的 CAI —— 让 AI 依据一份写下来的『宪法』批判并修改自己的输出，从而实现安全训练。",
    },
    how: {
      en: [
        "Phase 1 (SL): model critiques harmful response, then revises it",
        "Phase 2 (RL): preference model trained on AI feedback (RLAIF)",
        "Constitution = a list of natural-language principles (helpful, honest, harmless)",
      ],
      zh: [
        "第一阶段（SL）：模型批判有害回答，然后修改",
        "第二阶段（RL）：用 AI 反馈（RLAIF）训练偏好模型",
        "宪法 = 一组自然语言原则（有帮助、诚实、无害）",
      ],
    },
    workflow: {
      en: [
        "Author a list of constitutional principles",
        "Generate critique-revision pairs on red-team prompts",
        "SFT the model on revised responses",
        "Train preference model from AI rankings → RL fine-tune",
      ],
      zh: [
        "撰写一份宪法原则列表",
        "在红队提示上生成『批判-修改』对",
        "用修改后的回答 SFT 模型",
        "用 AI 排序训练偏好模型 → RL 微调",
      ],
    },
  },
  "07-safety-alignment/llamaguard": {
    what: {
      en: "Meta's LLM-based safety classifier that labels prompts and responses across 14 harm categories.",
      zh: "Meta 的基于 LLM 的安全分类器，可在 14 个危害类别上对提示与回答打标签。",
    },
    how: {
      en: [
        "Fine-tuned Llama-3 that outputs 'safe' or 'unsafe + categories'",
        "Configurable taxonomy — define your own harm categories at inference time",
        "Runs as a guardrail before/after the main model",
      ],
      zh: [
        "微调过的 Llama-3，输出 'safe' 或 'unsafe + 类别'",
        "类别可配置 —— 推理时可自定义危害分类法",
        "作为主模型前后置的护栏运行",
      ],
    },
    workflow: {
      en: [
        "Load LlamaGuard from HuggingFace",
        "Wrap user prompt + (optional) model response",
        "Inference returns label string + category list",
        "Block, rewrite, or warn based on the label",
      ],
      zh: [
        "从 HuggingFace 加载 LlamaGuard",
        "包装用户提示 + （可选）模型回答",
        "推理返回标签字符串 + 类别列表",
        "根据标签拦截、改写或提醒",
      ],
    },
  },
  "07-safety-alignment/nemo-guardrails": {
    what: {
      en: "NVIDIA's programmable guardrails for LLM apps — define dialog flows and safety rails in Colang DSL.",
      zh: "NVIDIA 的可编程 LLM 护栏 —— 用 Colang DSL 定义对话流程与安全规则。",
    },
    how: {
      en: [
        "Colang scripts describe topical, safety, and execution rails",
        "Runtime intercepts input/output and triggers matching rails",
        "Plugs into LangChain / OpenAI / HuggingFace through adapters",
      ],
      zh: [
        "Colang 脚本描述话题、安全与执行类护栏",
        "运行时拦截输入/输出并触发匹配的护栏",
        "通过适配器接入 LangChain / OpenAI / HuggingFace",
      ],
    },
    workflow: {
      en: [
        "Author config.yml + flows.co Colang scripts",
        "rails = LLMRails(config) wrapping your app",
        "Call rails.generate(messages=[...]) instead of LLM",
        "Iterate on flows based on red-team failures",
      ],
      zh: [
        "编写 config.yml 与 flows.co Colang 脚本",
        "rails = LLMRails(config) 包装你的应用",
        "调用 rails.generate(messages=[...]) 替代直接调用 LLM",
        "根据红队测试失败迭代 flows",
      ],
    },
  },
  "07-safety-alignment/prompt-guard": {
    what: {
      en: "Meta's small classifier model for detecting prompt injection and jailbreak attempts in user input.",
      zh: "Meta 的小型分类模型，用于检测用户输入中的提示注入与越狱企图。",
    },
    how: {
      en: [
        "86M-param mDeBERTa fine-tuned on jailbreak / injection corpora",
        "Outputs 3 labels: BENIGN, INJECTION, JAILBREAK",
        "<10ms inference latency — runs on CPU as a pre-filter",
      ],
      zh: [
        "86M 参数的 mDeBERTa，在越狱/注入语料上微调",
        "输出 3 个标签：BENIGN、INJECTION、JAILBREAK",
        "推理延迟 <10ms —— 可在 CPU 上作为前置过滤器运行",
      ],
    },
    workflow: {
      en: [
        "Load classifier with AutoModelForSequenceClassification",
        "Score every incoming user message",
        "Reject or sanitize JAILBREAK / INJECTION inputs",
        "Log + monitor attack rates over time",
      ],
      zh: [
        "用 AutoModelForSequenceClassification 加载分类器",
        "对每条用户消息打分",
        "拦截或清洗 JAILBREAK / INJECTION 输入",
        "记录并监控攻击发生率",
      ],
    },
  },

  // ========== 08 DISTRIBUTED TRAINING ==========
  "08-distributed-training/huggingface-accelerate": {
    what: {
      en: "Wrapper that turns single-GPU PyTorch code into distributed training across GPUs, TPUs, mixed precision in 4 lines.",
      zh: "用极少代码将单 GPU PyTorch 代码改造为跨 GPU、TPU、混合精度的分布式训练。",
    },
    how: {
      en: [
        "Accelerator object wraps model, optimizer, dataloader",
        "accelerator.prepare(...) handles device placement and DDP/FSDP wrapping",
        "Backend agnostic — same code runs on DDP, FSDP, DeepSpeed, Megatron-DDP",
      ],
      zh: [
        "Accelerator 对象封装模型、优化器与 dataloader",
        "accelerator.prepare(...) 处理设备分配与 DDP/FSDP 包装",
        "后端无关 —— 同一份代码可在 DDP、FSDP、DeepSpeed、Megatron-DDP 运行",
      ],
    },
    workflow: {
      en: [
        "accelerate config — interactive setup",
        "Replace .to(device) with accelerator.prepare()",
        "Replace loss.backward() with accelerator.backward(loss)",
        "accelerate launch script.py",
      ],
      zh: [
        "accelerate config —— 交互式配置",
        "用 accelerator.prepare() 替代 .to(device)",
        "用 accelerator.backward(loss) 替代 loss.backward()",
        "accelerate launch script.py 启动",
      ],
    },
  },
  "08-distributed-training/deepspeed": {
    what: {
      en: "Microsoft's deep-learning optimizer — ZeRO-1/2/3, pipeline parallelism, ZeRO-Infinity offload to CPU/NVMe.",
      zh: "微软的深度学习优化器 —— 提供 ZeRO-1/2/3、流水线并行与到 CPU/NVMe 的 ZeRO-Infinity 卸载。",
    },
    how: {
      en: [
        "ZeRO-1/2/3 progressively shards optimizer states, gradients, parameters",
        "Pipeline + tensor parallelism for model dimensions beyond a single node",
        "Offload to CPU RAM or NVMe SSD enables training >100B on commodity hardware",
      ],
      zh: [
        "ZeRO-1/2/3 逐级分片优化器状态、梯度与参数",
        "流水线 + 张量并行突破单节点模型尺寸限制",
        "卸载到 CPU 内存或 NVMe SSD 可在普通硬件训练 100B+ 模型",
      ],
    },
    workflow: {
      en: [
        "Author ds_config.json with ZeRO stage and offload settings",
        "deepspeed train.py --deepspeed ds_config.json",
        "Profile with DeepSpeed FlOps profiler",
        "Convert ZeRO checkpoint to FP32 for inference",
      ],
      zh: [
        "编写 ds_config.json，配置 ZeRO 阶段与卸载选项",
        "deepspeed train.py --deepspeed ds_config.json",
        "用 DeepSpeed FLOPs profiler 分析性能",
        "将 ZeRO 检查点转换为 FP32 供推理使用",
      ],
    },
  },
  "08-distributed-training/training-llms-megatron": {
    what: {
      en: "NVIDIA's Megatron-LM — tensor, pipeline, and sequence parallelism used to train GPT-4-class models.",
      zh: "NVIDIA Megatron-LM —— 提供张量、流水线、序列并行，被用于训练 GPT-4 级别模型。",
    },
    how: {
      en: [
        "Tensor parallelism splits attention heads and MLP across GPUs",
        "Pipeline parallelism distributes layers across stages",
        "Sequence parallelism splits the sequence dimension for memory savings",
      ],
      zh: [
        "张量并行将注意力头与 MLP 分到多 GPU",
        "流水线并行将层分到不同阶段",
        "序列并行沿序列维度切分以节省显存",
      ],
    },
    workflow: {
      en: [
        "Convert HF checkpoint to Megatron format",
        "Configure --tensor-model-parallel-size --pipeline-model-parallel-size",
        "torchrun pretrain_gpt.py with config",
        "Convert back to HF for downstream use",
      ],
      zh: [
        "将 HF 检查点转换为 Megatron 格式",
        "配置 --tensor-model-parallel-size 与 --pipeline-model-parallel-size",
        "torchrun pretrain_gpt.py 启动训练",
        "训练完成后转回 HF 格式供下游使用",
      ],
    },
  },
  "08-distributed-training/pytorch-fsdp2": {
    what: {
      en: "Fully Sharded Data Parallel v2 — per-parameter sharding with full torch.compile and tensor-parallel composability.",
      zh: "完全分片数据并行 v2 —— 按参数粒度分片，完整支持 torch.compile 与张量并行组合。",
    },
    how: {
      en: [
        "Each parameter is a DTensor sharded across the device mesh",
        "fully_shard() applied per nn.Module — no FlatParameter wrapping",
        "Composable with TP, PP, and torch.compile out of the box",
      ],
      zh: [
        "每个参数是按 device mesh 分片的 DTensor",
        "在每个 nn.Module 上调用 fully_shard() —— 无需 FlatParameter 包装",
        "原生可与 TP、PP 与 torch.compile 组合",
      ],
    },
    workflow: {
      en: [
        "Build DeviceMesh for data + tensor parallel dims",
        "Apply fully_shard(module, mesh=mesh) bottom-up",
        "Train as usual; checkpoint via DCP",
        "Resume from sharded checkpoint on different topology",
      ],
      zh: [
        "为数据 + 张量并行维度构建 DeviceMesh",
        "自下而上调用 fully_shard(module, mesh=mesh)",
        "正常训练；用 DCP 保存检查点",
        "可在不同拓扑下从分片检查点恢复",
      ],
    },
  },
  "08-distributed-training/pytorch-lightning": {
    what: {
      en: "High-level training framework — handles distribution, mixed precision, checkpointing, logging via a Trainer abstraction.",
      zh: "高级训练框架 —— 通过 Trainer 抽象统一处理分布式、混合精度、检查点与日志。",
    },
    how: {
      en: [
        "LightningModule defines train/val/test_step + configure_optimizers",
        "Trainer flag system enables DDP, FSDP, DeepSpeed without code changes",
        "Callbacks for early stopping, model summary, learning rate monitoring",
      ],
      zh: [
        "LightningModule 定义 train/val/test_step 与 configure_optimizers",
        "Trainer 通过标志位启用 DDP、FSDP、DeepSpeed，无需改代码",
        "回调机制支持早停、模型摘要、学习率监控",
      ],
    },
    workflow: {
      en: [
        "Subclass LightningModule with your model + steps",
        "Wrap data in LightningDataModule",
        "trainer = Trainer(strategy='ddp', precision='bf16-mixed')",
        "trainer.fit(model, datamodule)",
      ],
      zh: [
        "继承 LightningModule，实现模型与各 step",
        "用 LightningDataModule 封装数据",
        "trainer = Trainer(strategy='ddp', precision='bf16-mixed')",
        "trainer.fit(model, datamodule)",
      ],
    },
  },
  "08-distributed-training/ray-train": {
    what: {
      en: "Ray-native distributed training — scale a single-node script to any cloud cluster with one decorator.",
      zh: "Ray 原生分布式训练 —— 一个装饰器即可将单机脚本扩展到任意云集群。",
    },
    how: {
      en: [
        "TorchTrainer launches your train_loop_per_worker on each Ray actor",
        "Auto-handles distributed init, gradient sync, NCCL groups",
        "Integrates with Ray Tune for distributed HPO",
      ],
      zh: [
        "TorchTrainer 在每个 Ray actor 上启动你的 train_loop_per_worker",
        "自动处理分布式初始化、梯度同步与 NCCL 组",
        "与 Ray Tune 集成实现分布式超参数搜索",
      ],
    },
    workflow: {
      en: [
        "Write train_loop_per_worker(config) function",
        "trainer = TorchTrainer(loop, scaling_config=ScalingConfig(num_workers=8, use_gpu=True))",
        "result = trainer.fit()",
        "Inspect result.metrics + checkpoint",
      ],
      zh: [
        "编写 train_loop_per_worker(config) 函数",
        "trainer = TorchTrainer(loop, scaling_config=ScalingConfig(num_workers=8, use_gpu=True))",
        "result = trainer.fit()",
        "检查 result.metrics 与 checkpoint",
      ],
    },
  },

  // ========== 09 INFRASTRUCTURE ==========
  "09-infrastructure/lambda-labs-gpu-cloud": {
    what: {
      en: "Affordable GPU cloud — on-demand H100, A100, RTX instances at the lowest list prices in the industry.",
      zh: "高性价比的 GPU 云 —— 按需提供 H100、A100、RTX 实例，行业内挂牌价最低。",
    },
    how: {
      en: [
        "REST API + Web UI to launch / SSH / terminate instances",
        "Pre-built ML stack image (CUDA, PyTorch, JAX, drivers)",
        "Persistent file system option for cross-instance datasets",
      ],
      zh: [
        "REST API + Web 界面，启动 / SSH / 销毁实例",
        "预装 ML 栈镜像（CUDA、PyTorch、JAX、驱动）",
        "可选持久化文件系统，跨实例共享数据集",
      ],
    },
    workflow: {
      en: [
        "Generate API key in Lambda dashboard",
        "POST /instance-operations/launch with instance_type + region",
        "SSH into the public IP returned",
        "Run training, then DELETE to stop billing",
      ],
      zh: [
        "在 Lambda 控制台生成 API key",
        "POST /instance-operations/launch，指定 instance_type + region",
        "SSH 登录返回的公网 IP",
        "运行训练后调用 DELETE 停止计费",
      ],
    },
  },
  "09-infrastructure/modal-serverless-gpu": {
    what: {
      en: "Serverless GPU platform — define functions in Python, run them on H100s in seconds, pay per second.",
      zh: "Serverless GPU 平台 —— 用 Python 定义函数，几秒内即可在 H100 上运行，按秒计费。",
    },
    how: {
      en: [
        "@app.function decorator declares image, GPU, secrets, mounts",
        "Modal builds the container in the cloud and caches it",
        "Cold starts in ~1s; warm starts <100ms",
      ],
      zh: [
        "@app.function 装饰器声明镜像、GPU、密钥、挂载",
        "Modal 在云端构建并缓存容器",
        "冷启动约 1 秒；热启动 <100ms",
      ],
    },
    workflow: {
      en: [
        "Define modal.App and Image in a Python file",
        "Decorate functions with @app.function(gpu='H100')",
        "modal run script.py — runs locally + remotely",
        "modal deploy script.py for production endpoints",
      ],
      zh: [
        "在 Python 文件中定义 modal.App 与 Image",
        "用 @app.function(gpu='H100') 装饰函数",
        "modal run script.py —— 本地与远程一同运行",
        "modal deploy script.py 部署为生产端点",
      ],
    },
  },
  "09-infrastructure/skypilot-multi-cloud-orchestration": {
    what: {
      en: "Run LLM workloads across AWS, GCP, Azure, RunPod with automatic spot recovery and price-region optimization.",
      zh: "在 AWS、GCP、Azure、RunPod 间调度 LLM 任务 —— 自动 spot 恢复与价格/区域优化。",
    },
    how: {
      en: [
        "YAML task spec — resources, setup script, run script",
        "Auto-finds cheapest region with required GPU type across clouds",
        "Managed Spot mode resumes from checkpoint after preemption",
      ],
      zh: [
        "YAML 任务描述 —— 资源、setup 脚本、run 脚本",
        "自动在多云中寻找最便宜的、含目标 GPU 的区域",
        "Managed Spot 模式可在被抢占后从检查点恢复",
      ],
    },
    workflow: {
      en: [
        "sky check — verify cloud credentials",
        "Author task.yaml with resources: { accelerators: A100:8 }",
        "sky launch task.yaml — provisions and runs",
        "sky down to terminate when finished",
      ],
      zh: [
        "sky check —— 验证云端凭证",
        "编写 task.yaml，resources: { accelerators: A100:8 }",
        "sky launch task.yaml —— 自动开机并运行",
        "完成后 sky down 停止资源",
      ],
    },
  },

  // ========== 10 OPTIMIZATION ==========
  "10-optimization/awq-quantization": {
    what: {
      en: "Activation-Aware Weight Quantization — 4-bit quantization that preserves the most salient (highest activation magnitude) weights.",
      zh: "激活感知的权重量化 —— 4-bit 量化，保留激活幅值最大的关键权重。",
    },
    how: {
      en: [
        "Search for per-channel scaling that minimizes salient-weight error",
        "Apply scale before quantization, fuse inverse into next layer",
        "Symmetric 4-bit quant of weights only (activations stay FP16)",
      ],
      zh: [
        "搜索每通道缩放，最小化关键权重的量化误差",
        "在量化前应用缩放，逆缩放融合到下一层",
        "对权重做对称 4-bit 量化（激活保持 FP16）",
      ],
    },
    workflow: {
      en: [
        "Calibrate on ~128 samples from your domain",
        "model.quantize(tokenizer, quant_config={...})",
        "model.save_quantized('./awq-model')",
        "Serve with vLLM or AutoAWQ runtime",
      ],
      zh: [
        "在约 128 条领域样本上做校准",
        "model.quantize(tokenizer, quant_config={...})",
        "model.save_quantized('./awq-model')",
        "用 vLLM 或 AutoAWQ 运行时部署",
      ],
    },
  },
  "10-optimization/quantizing-models-bitsandbytes": {
    what: {
      en: "8-bit and 4-bit quantization that enables LLM fine-tuning on consumer GPUs (QLoRA on a single 24GB card).",
      zh: "8-bit 与 4-bit 量化 —— 使 LLM 在消费级 GPU 上微调成为可能（24GB 卡即可 QLoRA）。",
    },
    how: {
      en: [
        "Load model with load_in_4bit=True / load_in_8bit=True",
        "NF4 (NormalFloat 4) data type optimized for normally-distributed weights",
        "Double quantization further compresses the quant constants",
      ],
      zh: [
        "用 load_in_4bit=True / load_in_8bit=True 加载模型",
        "NF4（NormalFloat 4）数据类型，针对正态分布权重优化",
        "二次量化进一步压缩量化常数",
      ],
    },
    workflow: {
      en: [
        "from transformers import BitsAndBytesConfig",
        "bnb_config = BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_quant_type='nf4')",
        "model = AutoModelForCausalLM.from_pretrained(name, quantization_config=bnb_config)",
        "Apply LoRA via PEFT and train as usual",
      ],
      zh: [
        "from transformers import BitsAndBytesConfig",
        "bnb_config = BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_quant_type='nf4')",
        "model = AutoModelForCausalLM.from_pretrained(name, quantization_config=bnb_config)",
        "通过 PEFT 应用 LoRA 后正常训练",
      ],
    },
  },
  "10-optimization/optimizing-attention-flash": {
    what: {
      en: "IO-aware exact attention — 2-8x speedup with linear memory cost. Required for any modern long-context training.",
      zh: "IO 感知的精确注意力 —— 2-8 倍加速、线性显存。任何现代长上下文训练的必备组件。",
    },
    how: {
      en: [
        "Tile QK^T into SRAM blocks; never materialize the full N×N matrix",
        "Online softmax statistics updated as blocks stream through",
        "Backward also tiled — recomputes attention from saved stats",
      ],
      zh: [
        "将 QK^T 分块加载到 SRAM；从不实例化完整的 N×N 矩阵",
        "在线 softmax 统计在分块流过时持续更新",
        "反向同样分块 —— 从保存的统计量重计算注意力",
      ],
    },
    workflow: {
      en: [
        "pip install flash-attn --no-build-isolation",
        "Set attn_implementation='flash_attention_2' on HF model",
        "Verify dtype is fp16 / bf16 (required)",
        "Profile to confirm speedup vs. SDPA",
      ],
      zh: [
        "pip install flash-attn --no-build-isolation",
        "在 HF 模型上设置 attn_implementation='flash_attention_2'",
        "确认 dtype 为 fp16 / bf16（必需）",
        "性能剖析确认相对 SDPA 的加速",
      ],
    },
  },
  "10-optimization/gguf-quantization": {
    what: {
      en: "llama.cpp's quantization format — 2-8 bit quants packaged with metadata, runs on CPU, GPU, Metal, Vulkan.",
      zh: "llama.cpp 的量化格式 —— 2-8 bit 量化与元数据打包，可在 CPU、GPU、Metal、Vulkan 上运行。",
    },
    how: {
      en: [
        "K-quants: per-block (32 weight) sub-byte quantization with mixed precision",
        "I-quants (IQ2/IQ3): use importance matrix for ultra-low-bit accuracy",
        "Single .gguf file contains weights + tokenizer + chat template",
      ],
      zh: [
        "K-quants：每 32 个权重一个块的子字节量化，支持混合精度",
        "I-quants（IQ2/IQ3）：使用重要性矩阵实现超低位的精度",
        "单个 .gguf 文件包含权重 + 分词器 + 聊天模板",
      ],
    },
    workflow: {
      en: [
        "Convert HF model: python convert_hf_to_gguf.py model/",
        "Quantize: ./llama-quantize model.gguf model.Q4_K_M.gguf Q4_K_M",
        "Optionally compute imatrix on calibration data first",
        "Load via llama-cpp-python or llama.cpp server",
      ],
      zh: [
        "转换 HF 模型：python convert_hf_to_gguf.py model/",
        "量化：./llama-quantize model.gguf model.Q4_K_M.gguf Q4_K_M",
        "可选：先在校准数据上计算 imatrix",
        "用 llama-cpp-python 或 llama.cpp server 加载",
      ],
    },
  },
  "10-optimization/gptq": {
    what: {
      en: "Post-training 3-4 bit quantization using Hessian information — minimal accuracy loss, fast inference.",
      zh: "基于 Hessian 信息的后训练 3-4 bit 量化 —— 精度损失最小、推理迅速。",
    },
    how: {
      en: [
        "Per-layer second-order weight reconstruction using OBQ algorithm",
        "Quantizes one column at a time, updating the rest to compensate",
        "Group-wise quantization (group_size=128) balances size vs. quality",
      ],
      zh: [
        "用 OBQ 算法在每层做二阶权重重构",
        "一次量化一列，并更新其余列做补偿",
        "分组量化（group_size=128）在体积与质量间取得平衡",
      ],
    },
    workflow: {
      en: [
        "Prepare calibration dataset (~128 samples)",
        "model.quantize(examples) with AutoGPTQ",
        "model.save_quantized('./gptq-model')",
        "Serve with vLLM, ExLlamaV2, or HF Transformers",
      ],
      zh: [
        "准备校准数据集（约 128 条样本）",
        "用 AutoGPTQ 调用 model.quantize(examples)",
        "model.save_quantized('./gptq-model')",
        "用 vLLM、ExLlamaV2 或 HF Transformers 部署",
      ],
    },
  },
  "10-optimization/hqq-quantization": {
    what: {
      en: "Half-Quadratic Quantization — calibration-free quantization that runs anywhere without sample data.",
      zh: "Half-Quadratic 量化 —— 无需校准数据即可在任意环境运行的量化方案。",
    },
    how: {
      en: [
        "Solves a half-quadratic optimization for optimal scale + zero per group",
        "No calibration set needed — works on any model out of the box",
        "Quantizes in seconds-to-minutes (vs. hours for GPTQ)",
      ],
      zh: [
        "通过半二次优化求解每组的最优 scale 与 zero",
        "无需校准集 —— 任意模型开箱即用",
        "量化耗时数秒到数分钟（GPTQ 通常要数小时）",
      ],
    },
    workflow: {
      en: [
        "from hqq.engine.hf import HQQModelForCausalLM",
        "model.quantize_model(quant_config=BaseQuantizeConfig(nbits=4))",
        "Save and reload via HQQ runtime",
        "Optional: backend swap for faster inference (Torch, ATEN)",
      ],
      zh: [
        "from hqq.engine.hf import HQQModelForCausalLM",
        "model.quantize_model(quant_config=BaseQuantizeConfig(nbits=4))",
        "保存并通过 HQQ 运行时重新加载",
        "可选：切换后端（Torch、ATEN）以加快推理",
      ],
    },
  },
  "10-optimization/ml-training-recipes": {
    what: {
      en: "Battle-tested recipes for stable training: warmup, gradient clipping, LR schedules, weight decay, batch sizing.",
      zh: "经过实战检验的稳定训练配方：warmup、梯度裁剪、学习率调度、权重衰减、batch 设置。",
    },
    how: {
      en: [
        "Linear warmup + cosine decay LR is the default safe choice",
        "Gradient clipping at 1.0 prevents loss spikes from outliers",
        "AdamW betas=(0.9, 0.95), weight_decay=0.1 mirrors GPT recipes",
      ],
      zh: [
        "线性 warmup + 余弦衰减学习率，是最稳的默认选择",
        "梯度裁剪到 1.0，可防止异常样本造成 loss 突刺",
        "AdamW betas=(0.9, 0.95)、weight_decay=0.1 复刻 GPT 系列配方",
      ],
    },
    workflow: {
      en: [
        "Estimate compute budget — choose model size via Chinchilla scaling",
        "Set batch size = warmup steps × grad accumulation (e.g., 4M tokens)",
        "Use bf16 mixed precision; enable torch.compile",
        "Log loss, grad norm, LR every step; checkpoint every 1B tokens",
      ],
      zh: [
        "估算算力预算 —— 用 Chinchilla 缩放律选择模型尺寸",
        "设置 batch_size = warmup_steps × 梯度累积（如 4M tokens）",
        "使用 bf16 混合精度；启用 torch.compile",
        "每步记录 loss、grad_norm、lr；每 1B tokens 保存一次",
      ],
    },
  },

  // ========== 11 EVALUATION ==========
  "11-evaluation/evaluating-code-models": {
    what: {
      en: "Evaluate code LLMs on 50+ benchmarks: HumanEval, MBPP, DS-1000, MultiPL-E, APPS — all with sandboxed execution.",
      zh: "在 50+ 代码基准上评估 LLM：HumanEval、MBPP、DS-1000、MultiPL-E、APPS —— 全部在沙箱中执行。",
    },
    how: {
      en: [
        "Generates k samples per problem, executes against unit tests",
        "Computes pass@1 / pass@10 / pass@100 unbiased estimators",
        "Docker sandbox isolates untrusted code execution",
      ],
      zh: [
        "对每个问题生成 k 个样本，运行单元测试",
        "计算 pass@1 / pass@10 / pass@100 的无偏估计",
        "Docker 沙箱隔离不可信代码执行",
      ],
    },
    workflow: {
      en: [
        "pip install bigcode-evaluation-harness",
        "accelerate launch main.py --tasks humaneval --model your-model",
        "Inspect generations.json + evaluation_results.json",
        "Compare across model variants",
      ],
      zh: [
        "pip install bigcode-evaluation-harness",
        "accelerate launch main.py --tasks humaneval --model your-model",
        "查看 generations.json 与 evaluation_results.json",
        "在不同模型变体间比较",
      ],
    },
  },
  "11-evaluation/evaluating-llms-harness": {
    what: {
      en: "EleutherAI's de-facto LLM eval framework — 200+ benchmarks including MMLU, ARC, HellaSwag, GSM8K, BBH.",
      zh: "EleutherAI 的事实标准 LLM 评估框架 —— 涵盖 MMLU、ARC、HellaSwag、GSM8K、BBH 等 200+ 基准。",
    },
    how: {
      en: [
        "Task YAMLs declare prompt template, answer format, metric",
        "Loglikelihood / generate_until / multiple_choice request types",
        "Backends: HF, vLLM, OpenAI API, llama.cpp",
      ],
      zh: [
        "任务 YAML 声明提示模板、答案格式与指标",
        "支持 loglikelihood / generate_until / multiple_choice 请求类型",
        "后端：HF、vLLM、OpenAI API、llama.cpp",
      ],
    },
    workflow: {
      en: [
        "lm_eval --model hf --model_args pretrained=name --tasks mmlu",
        "Optionally use vllm backend for 10x faster eval",
        "Inspect per-task accuracy table",
        "Submit results to Open LLM Leaderboard if desired",
      ],
      zh: [
        "lm_eval --model hf --model_args pretrained=name --tasks mmlu",
        "可选 vllm 后端，评估速度提升 10 倍",
        "查看每个任务的准确率表",
        "可选：提交结果到 Open LLM Leaderboard",
      ],
    },
  },
  "11-evaluation/nemo-evaluator-sdk": {
    what: {
      en: "NVIDIA's enterprise eval SDK — runs benchmarks at scale across multiple models with NeMo Microservices.",
      zh: "NVIDIA 的企业级评估 SDK —— 通过 NeMo Microservices 在多个模型上大规模运行基准。",
    },
    how: {
      en: [
        "Declarative job spec: model endpoint + task suite",
        "Distributed evaluation across many NIM endpoints",
        "Built-in support for academic + safety + RAG benchmarks",
      ],
      zh: [
        "声明式作业描述：模型端点 + 任务套件",
        "在多个 NIM 端点上分布式评估",
        "内置支持学术、安全、RAG 类基准",
      ],
    },
    workflow: {
      en: [
        "Deploy model as a NIM (NeMo Inference Microservice)",
        "Submit eval job via SDK or REST API",
        "Stream results to Weights & Biases or local DB",
        "Aggregate across model variants in dashboard",
      ],
      zh: [
        "将模型部署为 NIM（NeMo Inference Microservice）",
        "通过 SDK 或 REST API 提交评估作业",
        "将结果流式输出到 W&B 或本地数据库",
        "在仪表盘中跨模型变体汇总",
      ],
    },
  },

  // ========== 12 INFERENCE & SERVING ==========
  "12-inference-serving/llama-cpp": {
    what: {
      en: "C/C++ LLM inference engine — runs GGUF quantized models on CPU, CUDA, Metal, Vulkan with minimal dependencies.",
      zh: "C/C++ 实现的 LLM 推理引擎 —— 在 CPU、CUDA、Metal、Vulkan 上运行 GGUF 量化模型，依赖极少。",
    },
    how: {
      en: [
        "Custom GGML tensor library with hand-tuned SIMD kernels",
        "Speculative decoding, batched inference, continuous batching",
        "Built-in HTTP server compatible with the OpenAI API",
      ],
      zh: [
        "自研 GGML 张量库，配手工调优的 SIMD 核函数",
        "支持推测解码、批量推理、连续批处理",
        "内置兼容 OpenAI API 的 HTTP server",
      ],
    },
    workflow: {
      en: [
        "Download a GGUF model from HuggingFace",
        "./llama-server -m model.gguf -c 8192 -ngl 99",
        "Hit http://localhost:8080/v1/chat/completions",
        "Tune n_threads, batch size, GPU layers for your hardware",
      ],
      zh: [
        "从 HuggingFace 下载一个 GGUF 模型",
        "./llama-server -m model.gguf -c 8192 -ngl 99",
        "访问 http://localhost:8080/v1/chat/completions",
        "根据硬件调优 n_threads、batch size、GPU 层数",
      ],
    },
  },
  "12-inference-serving/ollama": {
    what: {
      en: "Run 100+ LLMs locally with zero config — single binary, model registry, OpenAI-compatible REST API.",
      zh: "本地零配置运行 100+ LLM —— 单二进制文件、模型仓库、OpenAI 兼容 REST API。",
    },
    how: {
      en: [
        "Built on llama.cpp; pulls quantized models from ollama.com registry",
        "Modelfile DSL for templating system prompts and parameters",
        "Background daemon serves models with auto-load/unload",
      ],
      zh: [
        "基于 llama.cpp；从 ollama.com 仓库拉取量化模型",
        "Modelfile DSL 用于模板化系统提示与参数",
        "后台守护进程提供模型服务，支持自动加载/卸载",
      ],
    },
    workflow: {
      en: [
        "ollama pull llama3.1:8b",
        "ollama run llama3.1:8b — chat in terminal",
        "Or POST to http://localhost:11434/v1/chat/completions",
        "Author Modelfile to ship custom variants",
      ],
      zh: [
        "ollama pull llama3.1:8b",
        "ollama run llama3.1:8b —— 在终端聊天",
        "或 POST 到 http://localhost:11434/v1/chat/completions",
        "编写 Modelfile 以发布自定义变体",
      ],
    },
  },
  "12-inference-serving/sglang": {
    what: {
      en: "RadixAttention KV cache + structured output — 5x faster than vLLM on multi-call agentic workloads.",
      zh: "RadixAttention KV 缓存 + 结构化输出 —— 在多轮 Agent 工作负载上比 vLLM 快 5 倍。",
    },
    how: {
      en: [
        "Radix tree shares KV cache across requests with common prefixes",
        "Compressed FSM for ultra-fast JSON / regex constrained decoding",
        "Frontend DSL for chaining LLM calls with branching and parallelism",
      ],
      zh: [
        "前缀共享的 Radix 树跨请求复用 KV 缓存",
        "压缩 FSM 实现超快 JSON / 正则约束解码",
        "前端 DSL 将 LLM 调用链式编排，支持分支与并行",
      ],
    },
    workflow: {
      en: [
        "python -m sglang.launch_server --model name --port 30000",
        "from sglang import function, gen, set_default_backend",
        "Define @function pipelines with branching",
        "Run on the local server backend",
      ],
      zh: [
        "python -m sglang.launch_server --model name --port 30000",
        "from sglang import function, gen, set_default_backend",
        "定义带分支的 @function 流水线",
        "在本地 server 后端运行",
      ],
    },
  },
  "12-inference-serving/tensorrt-llm": {
    what: {
      en: "NVIDIA's optimized inference engine — FP8, in-flight batching, speculative decoding. Best H100 throughput.",
      zh: "NVIDIA 的优化推理引擎 —— FP8、in-flight batching、推测解码。H100 上吞吐最高。",
    },
    how: {
      en: [
        "Ahead-of-time engine compilation per (model, GPU, batch) combo",
        "FP8 with E4M3 / E5M2 cuts memory and doubles throughput on H100",
        "Triton Inference Server backend for production deployment",
      ],
      zh: [
        "针对每个（模型、GPU、batch）组合做 AOT 引擎编译",
        "FP8（E4M3 / E5M2）减半显存并将 H100 吞吐翻倍",
        "通过 Triton Inference Server 后端部署到生产",
      ],
    },
    workflow: {
      en: [
        "Convert HF model: python convert_checkpoint.py",
        "Build engine: trtllm-build --checkpoint_dir ... --output_dir engines",
        "Run with python examples/run.py --engine_dir engines",
        "Wrap in Triton for HTTP/gRPC serving",
      ],
      zh: [
        "转换 HF 模型：python convert_checkpoint.py",
        "构建引擎：trtllm-build --checkpoint_dir ... --output_dir engines",
        "用 python examples/run.py --engine_dir engines 运行",
        "通过 Triton 包装为 HTTP/gRPC 服务",
      ],
    },
  },
  "12-inference-serving/serving-llms-vllm": {
    what: {
      en: "PagedAttention KV cache management — 24x throughput vs HuggingFace generate. The production serving standard.",
      zh: "PagedAttention KV 缓存管理 —— 相比 HuggingFace generate 提升 24 倍吞吐。生产部署事实标准。",
    },
    how: {
      en: [
        "PagedAttention treats KV cache as virtual memory pages — no fragmentation",
        "Continuous batching merges new requests into the running batch each step",
        "Tensor parallelism + chunked prefill for long-context throughput",
      ],
      zh: [
        "PagedAttention 将 KV 缓存视为虚拟内存页 —— 零碎片",
        "连续批处理在每一步将新请求合并到运行中的 batch",
        "张量并行 + 分块预填充，提升长上下文吞吐",
      ],
    },
    workflow: {
      en: [
        "vllm serve meta-llama/Llama-3-8B --tensor-parallel-size 2",
        "Hit /v1/chat/completions with OpenAI client",
        "Tune --max-num-seqs and --gpu-memory-utilization",
        "Deploy with Kubernetes via vLLM helm chart",
      ],
      zh: [
        "vllm serve meta-llama/Llama-3-8B --tensor-parallel-size 2",
        "用 OpenAI 客户端访问 /v1/chat/completions",
        "调优 --max-num-seqs 与 --gpu-memory-utilization",
        "用 vLLM helm chart 部署到 Kubernetes",
      ],
    },
  },

  // ========== 13 MLOPS ==========
  "13-mlops/mlflow": {
    what: {
      en: "Open-source MLOps platform — experiment tracking, model registry, packaging, and deployment in one toolkit.",
      zh: "开源 MLOps 平台 —— 实验跟踪、模型注册、打包与部署一站式解决。",
    },
    how: {
      en: [
        "mlflow.start_run() captures params, metrics, artifacts, source code",
        "Model Registry stages models: None → Staging → Production → Archived",
        "MLflow Models packages a model + dependencies for any deployment target",
      ],
      zh: [
        "mlflow.start_run() 自动记录参数、指标、产物与源码",
        "Model Registry 管理阶段：None → Staging → Production → Archived",
        "MLflow Models 将模型 + 依赖打包，适配各种部署目标",
      ],
    },
    workflow: {
      en: [
        "mlflow ui — start the tracking server",
        "with mlflow.start_run(): log params + metrics + model",
        "Promote best run to Production via UI or API",
        "mlflow models serve -m models:/MyModel/Production",
      ],
      zh: [
        "mlflow ui —— 启动跟踪服务",
        "with mlflow.start_run(): 记录参数、指标与模型",
        "通过界面或 API 将最佳运行升级为 Production",
        "mlflow models serve -m models:/MyModel/Production",
      ],
    },
  },
  "13-mlops/experiment-tracking-swanlab": {
    what: {
      en: "Lightweight experiment tracker with beautiful UI, offline mode, team collaboration — ideal for academic labs.",
      zh: "轻量级实验跟踪工具，界面美观，支持离线模式与团队协作 —— 学术实验室的理想选择。",
    },
    how: {
      en: [
        "swanlab.init() + swanlab.log() — drop-in W&B-style API",
        "Local SQLite backend or self-hosted server",
        "Auto-captures GPU stats, code, conda env, git commit",
      ],
      zh: [
        "swanlab.init() + swanlab.log() —— 与 W&B 风格相同的 API",
        "本地 SQLite 后端或自托管 server",
        "自动捕获 GPU 状态、代码、conda 环境、git 提交",
      ],
    },
    workflow: {
      en: [
        "pip install swanlab && swanlab login",
        "swanlab.init(project='my-project', config={...})",
        "swanlab.log({'loss': loss}) inside training loop",
        "Browse runs at swanlab.cn or local UI",
      ],
      zh: [
        "pip install swanlab && swanlab login",
        "swanlab.init(project='my-project', config={...})",
        "在训练循环中调用 swanlab.log({'loss': loss})",
        "在 swanlab.cn 或本地 UI 浏览实验",
      ],
    },
  },
  "13-mlops/tensorboard": {
    what: {
      en: "Visualization toolkit for training metrics, embeddings, model graphs — the original DL experiment tracker.",
      zh: "训练指标、嵌入向量、模型图的可视化工具 —— 最早的深度学习实验跟踪工具。",
    },
    how: {
      en: [
        "SummaryWriter logs scalars, histograms, images, embeddings to tfevents",
        "tensorboard --logdir runs/ serves a local web UI",
        "Native PyTorch (torch.utils.tensorboard) and TensorFlow integration",
      ],
      zh: [
        "SummaryWriter 将标量、直方图、图像、嵌入写入 tfevents",
        "tensorboard --logdir runs/ 启动本地 Web UI",
        "原生支持 PyTorch（torch.utils.tensorboard）与 TensorFlow",
      ],
    },
    workflow: {
      en: [
        "writer = SummaryWriter('runs/exp1')",
        "writer.add_scalar('loss', loss, step) inside loop",
        "tensorboard --logdir runs in another terminal",
        "Open http://localhost:6006",
      ],
      zh: [
        "writer = SummaryWriter('runs/exp1')",
        "训练循环中调用 writer.add_scalar('loss', loss, step)",
        "在另一终端运行 tensorboard --logdir runs",
        "打开 http://localhost:6006",
      ],
    },
  },
  "13-mlops/weights-and-biases": {
    what: {
      en: "Industry-standard ML tracking — runs, sweeps, artifacts, reports, model registry. Used by most top AI labs.",
      zh: "行业标准 ML 跟踪平台 —— 实验、超参搜索、产物、报告、模型注册。多数顶级 AI 实验室在用。",
    },
    how: {
      en: [
        "wandb.init + wandb.log — auto-syncs to cloud or self-hosted server",
        "Sweeps engine runs grid / random / Bayesian HPO across agents",
        "Artifacts version datasets and models with content-addressed storage",
      ],
      zh: [
        "wandb.init + wandb.log —— 自动同步到云端或自托管 server",
        "Sweeps 引擎跨多 agent 运行 grid / random / 贝叶斯 HPO",
        "Artifacts 用内容寻址存储版本化数据集与模型",
      ],
    },
    workflow: {
      en: [
        "wandb login + wandb.init(project='proj')",
        "Log metrics each step; save artifacts at end",
        "Author sweep.yaml; wandb sweep + wandb agent",
        "Compare runs in Workspace, share via Reports",
      ],
      zh: [
        "wandb login + wandb.init(project='proj')",
        "每步记录指标；结束时保存 artifacts",
        "编写 sweep.yaml；wandb sweep + wandb agent",
        "在 Workspace 中比较实验，通过 Reports 分享",
      ],
    },
  },

  // ========== 14 AGENTS ==========
  "14-agents/evolving-ai-agents": {
    what: {
      en: "Evolutionary approach to AI agent design — agents self-improve via mutation, crossover, and selection.",
      zh: "AI Agent 的演化方法 —— 通过变异、交叉、选择实现自我改进。",
    },
    how: {
      en: [
        "Population of agent prompts/tools/policies sampled each generation",
        "Fitness measured on a held-out task suite",
        "Top-K agents are mutated and crossed over to form next generation",
      ],
      zh: [
        "每一代从 agent 提示/工具/策略种群中采样",
        "在保留任务套件上测量 fitness",
        "Top-K agent 经过变异与交叉产生下一代",
      ],
    },
    workflow: {
      en: [
        "Define agent skeleton + mutation operators",
        "Define fitness = score on benchmark suite",
        "Run evolution loop for N generations",
        "Snapshot Pareto-optimal agents",
      ],
      zh: [
        "定义 agent 骨架与变异算子",
        "定义 fitness = 基准套件上的得分",
        "运行 N 代演化循环",
        "快照 Pareto 最优的 agent",
      ],
    },
  },
  "14-agents/autogpt-agents": {
    what: {
      en: "Autonomous GPT-4 agent that chains tasks, browses the web, writes and executes code without human intervention.",
      zh: "自主 GPT-4 Agent —— 链式执行任务、浏览网页、写代码并执行，全程无需人工干预。",
    },
    how: {
      en: [
        "Plan → Criticize → Act loop driven by LLM reasoning",
        "Tool use via JSON function calls (web, file, code, shell)",
        "Long-term memory in vector DB; short-term in conversation buffer",
      ],
      zh: [
        "由 LLM 推理驱动的『规划 → 自我批判 → 执行』循环",
        "通过 JSON 函数调用使用工具（网页、文件、代码、shell）",
        "长期记忆存于向量库；短期记忆在对话缓冲",
      ],
    },
    workflow: {
      en: [
        "Provide a high-level objective + budget",
        "Agent decomposes into subtasks autonomously",
        "Monitor execution log; intervene if it loops",
        "Collect produced artifacts at termination",
      ],
      zh: [
        "提供高层目标与预算",
        "Agent 自主拆解为子任务",
        "监控执行日志；如出现死循环则介入",
        "在终止时收集产物",
      ],
    },
  },
  "14-agents/crewai-multi-agent": {
    what: {
      en: "Multi-agent orchestration with role-playing, task delegation, and sequential or parallel workflows.",
      zh: "多 Agent 编排框架 —— 支持角色扮演、任务委派、顺序或并行流程。",
    },
    how: {
      en: [
        "Agents have role + goal + backstory + tools",
        "Tasks are assigned to specific agents with expected outputs",
        "Crew runs sequential, hierarchical, or parallel processes",
      ],
      zh: [
        "Agent 拥有角色 + 目标 + 背景故事 + 工具",
        "任务分配给特定 agent，并指定期望输出",
        "Crew 以顺序、分层或并行方式运行流程",
      ],
    },
    workflow: {
      en: [
        "Define agents (researcher, writer, editor, …)",
        "Define Tasks bound to each agent",
        "Crew(agents, tasks, process=Process.sequential).kickoff()",
        "Inspect intermediate outputs and final result",
      ],
      zh: [
        "定义 agent（researcher、writer、editor……）",
        "定义绑定到每个 agent 的 Task",
        "Crew(agents, tasks, process=Process.sequential).kickoff()",
        "查看中间输出与最终结果",
      ],
    },
  },
  "14-agents/langchain": {
    what: {
      en: "The most popular LLM framework — ReAct agents, RAG pipelines, 500+ integrations across LLMs, vector DBs, tools.",
      zh: "最流行的 LLM 框架 —— ReAct agent、RAG 流程，覆盖 LLM、向量库、工具的 500+ 集成。",
    },
    how: {
      en: [
        "LCEL (LangChain Expression Language) chains components with | operator",
        "Runnables share streaming, async, batching, retry semantics",
        "LangGraph adds stateful, multi-actor agent graphs on top",
      ],
      zh: [
        "LCEL（LangChain 表达式语言）用 | 运算符串联组件",
        "Runnables 共享流式、异步、批量、重试语义",
        "LangGraph 在其上提供有状态、多 actor 的 agent 图",
      ],
    },
    workflow: {
      en: [
        "Compose chain: prompt | llm | parser",
        "Add retriever for RAG: retriever | prompt | llm",
        "Wrap in LangGraph for agent loops",
        "Trace via LangSmith for debugging",
      ],
      zh: [
        "组合链：prompt | llm | parser",
        "为 RAG 加入检索器：retriever | prompt | llm",
        "用 LangGraph 包装实现 agent 循环",
        "通过 LangSmith 跟踪调试",
      ],
    },
  },
  "14-agents/llamaindex": {
    what: {
      en: "Data framework for LLM apps — best for RAG over complex documents, knowledge graphs, and structured data.",
      zh: "LLM 应用的数据框架 —— 在复杂文档、知识图谱、结构化数据上做 RAG 的最佳选择。",
    },
    how: {
      en: [
        "Document loaders → Node parsers → Indexes (vector, summary, KG, SQL)",
        "Query engines combine retrieval + LLM synthesis",
        "Workflows / agents on top for tool-using flows",
      ],
      zh: [
        "Document loader → Node parser → 索引（向量、摘要、KG、SQL）",
        "查询引擎结合检索 + LLM 合成",
        "在其上构建 Workflows / agents 实现工具使用",
      ],
    },
    workflow: {
      en: [
        "documents = SimpleDirectoryReader('data/').load_data()",
        "index = VectorStoreIndex.from_documents(documents)",
        "query_engine = index.as_query_engine()",
        "response = query_engine.query('...')",
      ],
      zh: [
        "documents = SimpleDirectoryReader('data/').load_data()",
        "index = VectorStoreIndex.from_documents(documents)",
        "query_engine = index.as_query_engine()",
        "response = query_engine.query('...')",
      ],
    },
  },
  "14-agents/openhands": {
    what: {
      en: "Autonomous AI software engineer that writes code, runs experiments, and manages GitHub repos end-to-end.",
      zh: "自主 AI 软件工程师 —— 端到端写代码、跑实验、管理 GitHub 仓库。",
    },
    how: {
      en: [
        "CodeAct agent emits Python actions executed in sandbox container",
        "Browser, file, bash, IPython tools available out of the box",
        "GitHub / GitLab integration for PR creation and code review",
      ],
      zh: [
        "CodeAct agent 在沙箱容器中发出并执行 Python 动作",
        "开箱即用支持浏览器、文件、bash、IPython 工具",
        "GitHub / GitLab 集成用于创建 PR 与代码评审",
      ],
    },
    workflow: {
      en: [
        "docker run openhands-app + open localhost:3000",
        "Connect LLM (OpenAI / Anthropic / local)",
        "Describe task in chat; watch agent execute",
        "Review and merge resulting PR",
      ],
      zh: [
        "docker run openhands-app 后访问 localhost:3000",
        "连接 LLM（OpenAI / Anthropic / 本地）",
        "在聊天中描述任务；观察 agent 执行",
        "审查并合并产生的 PR",
      ],
    },
  },

  // ========== 15 RAG ==========
  "15-rag/chroma": {
    what: {
      en: "Open-source embedding database for RAG — built-in embeddings, metadata filtering, persistent storage.",
      zh: "面向 RAG 的开源嵌入数据库 —— 内置嵌入函数、元数据过滤、持久化存储。",
    },
    how: {
      en: [
        "Single-process or client-server modes; SQLite or DuckDB backend",
        "HNSW index for fast approximate nearest neighbor search",
        "EmbeddingFunction interface lets you plug any model",
      ],
      zh: [
        "支持单进程或客户端-服务端模式；后端为 SQLite 或 DuckDB",
        "HNSW 索引实现快速近似最近邻搜索",
        "EmbeddingFunction 接口可插入任意嵌入模型",
      ],
    },
    workflow: {
      en: [
        "client = chromadb.PersistentClient(path='./db')",
        "collection = client.create_collection('docs')",
        "collection.add(documents, metadatas, ids)",
        "collection.query(query_texts=[...], n_results=5)",
      ],
      zh: [
        "client = chromadb.PersistentClient(path='./db')",
        "collection = client.create_collection('docs')",
        "collection.add(documents, metadatas, ids)",
        "collection.query(query_texts=[...], n_results=5)",
      ],
    },
  },
  "15-rag/faiss": {
    what: {
      en: "Facebook AI's billion-scale similarity search library — GPU-accelerated, supports HNSW, IVF, PQ, OPQ.",
      zh: "Facebook AI 的十亿级相似度检索库 —— GPU 加速，支持 HNSW、IVF、PQ、OPQ。",
    },
    how: {
      en: [
        "Index types: Flat (exact), IVF (clustered), HNSW (graph), PQ (compressed)",
        "GPU indexes via faiss-gpu for 10-100x speedup",
        "Composable: IVF1024,PQ16 etc. via index_factory string",
      ],
      zh: [
        "索引类型：Flat（精确）、IVF（聚类）、HNSW（图）、PQ（压缩）",
        "通过 faiss-gpu 使用 GPU 索引，加速 10-100 倍",
        "可组合：IVF1024,PQ16 等通过 index_factory 字符串构建",
      ],
    },
    workflow: {
      en: [
        "index = faiss.index_factory(dim, 'IVF1024,PQ16')",
        "index.train(xb); index.add(xb)",
        "D, I = index.search(xq, k=10)",
        "Persist with faiss.write_index(index, 'idx.bin')",
      ],
      zh: [
        "index = faiss.index_factory(dim, 'IVF1024,PQ16')",
        "index.train(xb); index.add(xb)",
        "D, I = index.search(xq, k=10)",
        "用 faiss.write_index(index, 'idx.bin') 持久化",
      ],
    },
  },
  "15-rag/haystack": {
    what: {
      en: "Production NLP framework — build search pipelines and RAG with 100+ integrations and a visual pipeline builder.",
      zh: "生产级 NLP 框架 —— 用 100+ 集成与可视化 pipeline 构建器搭建搜索与 RAG 系统。",
    },
    how: {
      en: [
        "Pipeline = directed graph of Components (retriever, generator, ranker, …)",
        "Async + streaming + branching supported natively",
        "Document Stores (Elasticsearch, Weaviate, Qdrant, in-memory)",
      ],
      zh: [
        "Pipeline = 由组件（retriever、generator、ranker……）组成的有向图",
        "原生支持异步、流式与分支",
        "文档存储后端（Elasticsearch、Weaviate、Qdrant、内存）",
      ],
    },
    workflow: {
      en: [
        "Build pipeline: pipe.add_component(...); pipe.connect(...)",
        "Index documents into a Document Store",
        "pipe.run({'prompt_builder': {'query': '...'}})",
        "Inspect intermediate component outputs",
      ],
      zh: [
        "构建 pipeline：pipe.add_component(...); pipe.connect(...)",
        "将文档索引到 Document Store",
        "pipe.run({'prompt_builder': {'query': '...'}})",
        "查看各组件中间输出",
      ],
    },
  },
  "15-rag/pinecone": {
    what: {
      en: "Managed vector database for production RAG — hybrid search, metadata filtering, namespace isolation, no ops burden.",
      zh: "面向生产 RAG 的托管向量数据库 —— 混合检索、元数据过滤、命名空间隔离、无运维负担。",
    },
    how: {
      en: [
        "Serverless or pod-based indexes — auto-scales with traffic",
        "Hybrid search combines dense + sparse (BM25) vectors",
        "Multi-tenant via namespaces — isolate per-customer data",
      ],
      zh: [
        "Serverless 或 pod 索引 —— 随流量自动扩缩",
        "混合检索结合稠密 + 稀疏（BM25）向量",
        "通过命名空间实现多租户 —— 每客户数据隔离",
      ],
    },
    workflow: {
      en: [
        "pc = Pinecone(api_key=...) → create_index(...)",
        "index.upsert(vectors=[(id, embedding, meta), ...])",
        "index.query(vector=q, top_k=5, filter={'tag': 'x'})",
        "Use namespace='customer1' for tenant isolation",
      ],
      zh: [
        "pc = Pinecone(api_key=...) → create_index(...)",
        "index.upsert(vectors=[(id, embedding, meta), ...])",
        "index.query(vector=q, top_k=5, filter={'tag': 'x'})",
        "用 namespace='customer1' 实现租户隔离",
      ],
    },
  },
  "15-rag/qdrant-vector-search": {
    what: {
      en: "High-performance vector search engine in Rust — payload filtering, named vectors, on-disk storage.",
      zh: "Rust 实现的高性能向量搜索引擎 —— 支持 payload 过滤、命名向量、磁盘存储。",
    },
    how: {
      en: [
        "HNSW with filterable_hnsw — combines vector + payload filters efficiently",
        "Named vectors lets one point have multiple embeddings (text, image, ...)",
        "Quantization (scalar, product, binary) shrinks memory by up to 32x",
      ],
      zh: [
        "filterable_hnsw 高效结合向量与 payload 过滤",
        "命名向量允许一个 point 拥有多种嵌入（文本、图像……）",
        "量化（标量、product、binary）可将显存压缩最多 32 倍",
      ],
    },
    workflow: {
      en: [
        "docker run qdrant/qdrant — start server",
        "client.create_collection(name, vectors_config={...})",
        "client.upsert(collection, points=[...])",
        "client.search(collection, query_vector, query_filter, limit=10)",
      ],
      zh: [
        "docker run qdrant/qdrant —— 启动服务",
        "client.create_collection(name, vectors_config={...})",
        "client.upsert(collection, points=[...])",
        "client.search(collection, query_vector, query_filter, limit=10)",
      ],
    },
  },
  "15-rag/sentence-transformers": {
    what: {
      en: "State-of-the-art sentence embeddings for semantic search, clustering, classification — 10,000+ pretrained models.",
      zh: "顶尖的句子嵌入库 —— 用于语义检索、聚类、分类，提供 10,000+ 预训练模型。",
    },
    how: {
      en: [
        "Siamese / triplet networks fine-tuned for cosine similarity",
        "Models from MiniLM (22MB) to E5-Large-v2 (1.3GB)",
        "Cross-encoders for high-accuracy reranking on small candidate sets",
      ],
      zh: [
        "Siamese / triplet 网络针对余弦相似度微调",
        "模型从 MiniLM（22MB）到 E5-Large-v2（1.3GB）",
        "Cross-encoder 在小候选集上做高精度重排",
      ],
    },
    workflow: {
      en: [
        "model = SentenceTransformer('all-MiniLM-L6-v2')",
        "embeddings = model.encode(sentences)",
        "scores = util.cos_sim(embeddings[0], embeddings[1:])",
        "Optional: rerank with CrossEncoder for top-K results",
      ],
      zh: [
        "model = SentenceTransformer('all-MiniLM-L6-v2')",
        "embeddings = model.encode(sentences)",
        "scores = util.cos_sim(embeddings[0], embeddings[1:])",
        "可选：用 CrossEncoder 对 top-K 结果重排",
      ],
    },
  },

  // ========== 16 PROMPT ENGINEERING ==========
  "16-prompt-engineering/dspy": {
    what: {
      en: "Declarative Self-improving Python — write programs as Modules, then auto-optimize prompts and few-shot examples.",
      zh: "声明式自我改进的 Python —— 用 Module 编写程序，然后自动优化提示与 few-shot 示例。",
    },
    how: {
      en: [
        "Signatures declare input/output fields with natural-language descriptions",
        "Modules (Predict, ChainOfThought, ReAct) compose into pipelines",
        "Optimizers (BootstrapFewShot, MIPROv2) search over prompts using a metric",
      ],
      zh: [
        "Signature 用自然语言描述输入/输出字段",
        "Module（Predict、ChainOfThought、ReAct）组合成 pipeline",
        "Optimizer（BootstrapFewShot、MIPROv2）按指标搜索最优提示",
      ],
    },
    workflow: {
      en: [
        "Define Signatures and compose Modules",
        "Implement metric(example, prediction) → score",
        "optimizer.compile(program, trainset=...)",
        "Save the compiled program (prompts + demos)",
      ],
      zh: [
        "定义 Signature 并组合 Module",
        "实现 metric(example, prediction) → score",
        "optimizer.compile(program, trainset=...)",
        "保存编译后的程序（提示 + 示例）",
      ],
    },
  },
  "16-prompt-engineering/guidance": {
    what: {
      en: "Microsoft's constrained generation library — interleave Python code and LLM calls with token-level control.",
      zh: "微软的约束生成库 —— 将 Python 代码与 LLM 调用穿插，实现 token 级控制。",
    },
    how: {
      en: [
        "Templates use {{gen 'name' max_tokens=20}} to mark generation slots",
        "select(['yes', 'no']) constrains output to enumerated choices",
        "Stateful conversation handled via lm += role / message",
      ],
      zh: [
        "模板用 {{gen 'name' max_tokens=20}} 标记生成位置",
        "select(['yes', 'no']) 将输出限制在枚举值",
        "通过 lm += role / message 维护多轮对话状态",
      ],
    },
    workflow: {
      en: [
        "lm = models.LlamaCpp('model.gguf')",
        "lm += 'Question: {q}\\nAnswer: ' + gen('answer', max_tokens=50)",
        "Extract lm['answer'] for the result",
        "Combine with select() for structured outputs",
      ],
      zh: [
        "lm = models.LlamaCpp('model.gguf')",
        "lm += 'Question: {q}\\nAnswer: ' + gen('answer', max_tokens=50)",
        "通过 lm['answer'] 提取结果",
        "与 select() 组合实现结构化输出",
      ],
    },
  },
  "16-prompt-engineering/instructor": {
    what: {
      en: "Structured output extraction using Pydantic — turn any LLM into a typed function with retry and streaming.",
      zh: "基于 Pydantic 的结构化输出提取 —— 将任意 LLM 变成支持重试与流式的类型化函数。",
    },
    how: {
      en: [
        "Wraps OpenAI / Anthropic / Gemini / Ollama clients via instructor.patch()",
        "response_model=PydanticClass forces JSON / function-calling output",
        "Auto-retries with validation errors fed back to the model",
      ],
      zh: [
        "通过 instructor.patch() 包装 OpenAI / Anthropic / Gemini / Ollama 客户端",
        "response_model=PydanticClass 强制 JSON / function-calling 输出",
        "自动重试，将校验错误反馈给模型",
      ],
    },
    workflow: {
      en: [
        "client = instructor.from_openai(openai.OpenAI())",
        "Define BaseModel for desired output shape",
        "client.chat.completions.create(response_model=Model, ...)",
        "Use as a drop-in typed function in your codebase",
      ],
      zh: [
        "client = instructor.from_openai(openai.OpenAI())",
        "定义所需输出形状的 BaseModel",
        "client.chat.completions.create(response_model=Model, ...)",
        "在代码中作为类型化函数直接使用",
      ],
    },
  },
  "16-prompt-engineering/outlines": {
    what: {
      en: "Fast structured generation — constrain LLM output to JSON schema, regex, context-free grammar, or Pydantic types.",
      zh: "快速结构化生成 —— 用 JSON Schema、正则、上下文无关文法或 Pydantic 类型约束 LLM 输出。",
    },
    how: {
      en: [
        "Compiles constraint into a finite-state machine over the tokenizer vocab",
        "At each step, masks invalid tokens before sampling — zero-overhead constraint",
        "Works with HuggingFace, vLLM, llama.cpp, MLX backends",
      ],
      zh: [
        "将约束编译为基于 tokenizer 词表的有限状态机",
        "每步在采样前屏蔽非法 token —— 零开销约束",
        "支持 HuggingFace、vLLM、llama.cpp、MLX 后端",
      ],
    },
    workflow: {
      en: [
        "model = outlines.models.transformers(name)",
        "generator = outlines.generate.json(model, MyModel)",
        "result = generator(prompt) — guaranteed valid JSON",
        "Or use regex / cfg generators for fine-grained control",
      ],
      zh: [
        "model = outlines.models.transformers(name)",
        "generator = outlines.generate.json(model, MyModel)",
        "result = generator(prompt) —— 保证是合法 JSON",
        "也可使用 regex / cfg 生成器做细粒度控制",
      ],
    },
  },

  // ========== 17 OBSERVABILITY ==========
  "17-observability/langsmith-observability": {
    what: {
      en: "LangChain's LLM observability platform — trace, debug, evaluate, and monitor LLM apps in production.",
      zh: "LangChain 的 LLM 可观测平台 —— 跟踪、调试、评估并监控生产中的 LLM 应用。",
    },
    how: {
      en: [
        "Auto-traces any LangChain runnable; manual trace for vanilla code",
        "Datasets + Evaluators run regression tests on prompt changes",
        "Online monitoring tracks latency, token cost, error rate, feedback",
      ],
      zh: [
        "自动跟踪任意 LangChain runnable；纯代码可手动加 trace",
        "Dataset + Evaluator 对提示改动做回归测试",
        "在线监控记录延迟、token 成本、错误率与反馈",
      ],
    },
    workflow: {
      en: [
        "export LANGCHAIN_TRACING_V2=true + API key",
        "Run any chain — traces appear in LangSmith UI",
        "Annotate runs, build dataset, run evaluators",
        "Set up alerts on production metrics",
      ],
      zh: [
        "export LANGCHAIN_TRACING_V2=true 与 API key",
        "运行任意 chain —— 跟踪即可出现在 LangSmith UI",
        "对运行打标签，构建数据集并运行评估器",
        "针对生产指标设置告警",
      ],
    },
  },
  "17-observability/phoenix-observability": {
    what: {
      en: "Arize AI's open-source LLM observability — OpenTelemetry-based tracing, evals, and dataset curation.",
      zh: "Arize AI 的开源 LLM 可观测平台 —— 基于 OpenTelemetry 的跟踪、评估与数据治理。",
    },
    how: {
      en: [
        "OpenInference instrumentation for LangChain, LlamaIndex, OpenAI, DSPy",
        "Span-level traces with prompts, completions, retrievals, token counts",
        "Built-in eval models (Hallucination, QA Correctness, Toxicity)",
      ],
      zh: [
        "OpenInference 为 LangChain、LlamaIndex、OpenAI、DSPy 提供埋点",
        "span 级跟踪记录提示、补全、检索、token 数",
        "内置评估模型（幻觉、QA 正确性、毒性）",
      ],
    },
    workflow: {
      en: [
        "px.launch_app() — local Phoenix UI on port 6006",
        "Enable OpenInference instrumentation",
        "Run app — traces stream into Phoenix",
        "Run evals on traces; export curated dataset",
      ],
      zh: [
        "px.launch_app() —— 本地 Phoenix UI 在 6006 端口",
        "启用 OpenInference 埋点",
        "运行应用 —— trace 流入 Phoenix",
        "对 trace 运行评估；导出整理后的数据集",
      ],
    },
  },

  // ========== 18 MULTIMODAL ==========
  "18-multimodal/audiocraft-audio-generation": {
    what: {
      en: "Meta's audio generation toolkit — MusicGen for music, AudioGen for sound effects, EnCodec for compression.",
      zh: "Meta 的音频生成工具包 —— MusicGen 生成音乐、AudioGen 生成音效、EnCodec 做音频压缩。",
    },
    how: {
      en: [
        "MusicGen: single-stage Transformer over EnCodec discrete tokens",
        "Conditions on text + optional melody chromagram",
        "EnCodec: neural audio codec with residual vector quantization",
      ],
      zh: [
        "MusicGen：基于 EnCodec 离散 token 的单阶段 Transformer",
        "以文本 + 可选旋律 chromagram 为条件",
        "EnCodec：使用残差向量量化的神经音频编解码器",
      ],
    },
    workflow: {
      en: [
        "model = MusicGen.get_pretrained('medium')",
        "model.set_generation_params(duration=8)",
        "wav = model.generate(['80s pop with synths'])",
        "audio_write('out', wav, model.sample_rate)",
      ],
      zh: [
        "model = MusicGen.get_pretrained('medium')",
        "model.set_generation_params(duration=8)",
        "wav = model.generate(['80s pop with synths'])",
        "audio_write('out', wav, model.sample_rate)",
      ],
    },
  },
  "18-multimodal/blip-2-vision-language": {
    what: {
      en: "Salesforce's vision-language model — Q-Former bridges a frozen image encoder and a frozen LLM for image Q&A.",
      zh: "Salesforce 的视觉-语言模型 —— Q-Former 将冻结的图像编码器与冻结的 LLM 桥接，实现图像问答。",
    },
    how: {
      en: [
        "Frozen ViT image encoder + frozen LLM (OPT, FlanT5)",
        "Q-Former: 32 learned query tokens bridge vision and language",
        "Two-stage pretraining: representation then generation",
      ],
      zh: [
        "冻结的 ViT 图像编码器 + 冻结的 LLM（OPT、FlanT5）",
        "Q-Former：32 个可学习查询 token 桥接视觉与语言",
        "两阶段预训练：先表示对齐，再生成对齐",
      ],
    },
    workflow: {
      en: [
        "Load processor + model from HuggingFace",
        "inputs = processor(image, prompt, return_tensors='pt')",
        "out = model.generate(**inputs)",
        "Decode with processor.decode(out[0])",
      ],
      zh: [
        "从 HuggingFace 加载 processor 与 model",
        "inputs = processor(image, prompt, return_tensors='pt')",
        "out = model.generate(**inputs)",
        "用 processor.decode(out[0]) 解码",
      ],
    },
  },
  "18-multimodal/clip": {
    what: {
      en: "OpenAI's contrastive image-text model — zero-shot classification, image search, multimodal embeddings.",
      zh: "OpenAI 的对比式图像-文本模型 —— 零样本分类、图像搜索、多模态嵌入。",
    },
    how: {
      en: [
        "Image encoder (ViT) + text encoder (Transformer) trained with InfoNCE loss",
        "Aligns 400M image-text pairs into a shared embedding space",
        "Cosine similarity in embedding space = semantic similarity",
      ],
      zh: [
        "图像编码器（ViT）+ 文本编码器（Transformer），用 InfoNCE 损失训练",
        "将 4 亿图文对对齐到共享嵌入空间",
        "嵌入空间中的余弦相似度 = 语义相似度",
      ],
    },
    workflow: {
      en: [
        "model, preprocess = clip.load('ViT-B/32')",
        "image_features = model.encode_image(preprocess(img))",
        "text_features = model.encode_text(clip.tokenize(prompts))",
        "Softmax of similarities → zero-shot class probs",
      ],
      zh: [
        "model, preprocess = clip.load('ViT-B/32')",
        "image_features = model.encode_image(preprocess(img))",
        "text_features = model.encode_text(clip.tokenize(prompts))",
        "对相似度 softmax 即得到零样本类别概率",
      ],
    },
  },
  "18-multimodal/evaluating-cosmos-policy": {
    what: {
      en: "NVIDIA's world foundation model for robot learning — generates physically realistic future video for policy training.",
      zh: "NVIDIA 的世界基础模型，用于机器人学习 —— 生成物理真实的未来视频以训练策略。",
    },
    how: {
      en: [
        "Diffusion or autoregressive video model conditioned on action",
        "Trained on millions of hours of physical world video",
        "Policy training in simulation using rollouts from the world model",
      ],
      zh: [
        "以动作为条件的扩散或自回归视频模型",
        "在数百万小时的真实世界视频上训练",
        "在世界模型生成的 rollout 中训练策略",
      ],
    },
    workflow: {
      en: [
        "Load Cosmos-Predict or Cosmos-Reason checkpoint",
        "Provide initial frames + action sequence",
        "Generate future frames; score with reward model",
        "Iterate via model-based RL on the policy",
      ],
      zh: [
        "加载 Cosmos-Predict 或 Cosmos-Reason 检查点",
        "提供初始帧 + 动作序列",
        "生成未来帧；用奖励模型评分",
        "通过 model-based RL 迭代策略",
      ],
    },
  },
  "18-multimodal/llava": {
    what: {
      en: "Large Language and Vision Assistant — connects CLIP visual features to an LLM for multimodal conversation.",
      zh: "大型语言与视觉助手 —— 将 CLIP 视觉特征接入 LLM，实现多模态对话。",
    },
    how: {
      en: [
        "CLIP ViT-L/14 vision encoder → linear projection → LLM token space",
        "Two-stage train: feature alignment then visual instruction tuning",
        "Single image embedded as 576 visual tokens prepended to prompt",
      ],
      zh: [
        "CLIP ViT-L/14 视觉编码器 → 线性投影 → LLM token 空间",
        "两阶段训练：先特征对齐，再视觉指令微调",
        "单张图嵌入为 576 个视觉 token，前置到提示前",
      ],
    },
    workflow: {
      en: [
        "Load LlavaForConditionalGeneration from HuggingFace",
        "processor(images=img, text=f'USER: <image>\\n{q}\\nASSISTANT:')",
        "model.generate(**inputs, max_new_tokens=200)",
        "Decode with processor.decode(...)",
      ],
      zh: [
        "从 HuggingFace 加载 LlavaForConditionalGeneration",
        "processor(images=img, text=f'USER: <image>\\n{q}\\nASSISTANT:')",
        "model.generate(**inputs, max_new_tokens=200)",
        "用 processor.decode(...) 解码",
      ],
    },
  },
  "18-multimodal/openpi": {
    what: {
      en: "Fine-tune and serve Physical Intelligence's pi0 / pi0-fast / pi0.5 robot policies — a flow-matching VLA family with JAX (training) and PyTorch (deployment) backends.",
      zh: "微调并部署 Physical Intelligence 的 pi0 / pi0-fast / pi0.5 机器人策略 —— 基于流匹配的 VLA 家族，提供 JAX（训练）与 PyTorch（部署）双后端。",
    },
    how: {
      en: [
        "Three model variants: pi0 (flow-matching, highest quality), pi0-fast (autoregressive action tokens, 2-5× faster), pi0.5 (improved vision encoder, current default)",
        "Config-driven: every training/serving run defined in src/openpi/training/config.py — switch dataset, model, parallelism via flags",
        "Mandatory norm-stats step before training; WebSocket policy server exposes a low-latency inference API for ALOHA / DROID / LIBERO",
      ],
      zh: [
        "三种模型变体：pi0（流匹配，质量最高）、pi0-fast（自回归动作 token，速度提升 2-5 倍）、pi0.5（改进视觉编码器，当前默认）",
        "配置驱动：所有训练/部署运行都在 src/openpi/training/config.py 中定义 —— 通过参数切换数据集、模型与并行策略",
        "训练前必须先算 norm-stats；WebSocket 策略服务器为 ALOHA / DROID / LIBERO 提供低延迟推理 API",
      ],
    },
    workflow: {
      en: [
        "git clone --recurse-submodules openpi repo; uv sync the workspace",
        "uv run scripts/compute_norm_stats.py --config <name>",
        "uv run scripts/train.py <config> --exp_name=run1 (JAX) or torchrun for PyTorch DDP",
        "uv run scripts/serve_policy.py --env DROID; client connects via websocket_client_policy",
      ],
      zh: [
        "git clone --recurse-submodules openpi 仓库；用 uv sync 安装工作区",
        "uv run scripts/compute_norm_stats.py --config <name>",
        "uv run scripts/train.py <config> --exp_name=run1（JAX）或用 torchrun 走 PyTorch DDP",
        "uv run scripts/serve_policy.py --env DROID；客户端通过 websocket_client_policy 连接",
      ],
    },
  },
  "18-multimodal/openvla-oft": {
    what: {
      en: "LoRA fine-tuning of OpenVLA-7B with continuous action heads (L1 regression or diffusion) and FiLM conditioning — reproduces the OpenVLA-OFT paper on LIBERO and ALOHA.",
      zh: "对 OpenVLA-7B 做 LoRA 微调，配合连续动作头（L1 回归或扩散）与 FiLM 条件 —— 复现 OpenVLA-OFT 论文在 LIBERO 与 ALOHA 上的结果。",
    },
    how: {
      en: [
        "Replaces OpenVLA's discrete action tokens with continuous action heads — preserves precision lost to binning",
        "Rank-32 LoRA on the frozen VLA backbone keeps fine-tuning to 1-2 GB of trainable weights",
        "OFT+ adds FiLM conditioning and 3 camera streams (high + dual wrist) for ALOHA real-world tasks",
      ],
      zh: [
        "用连续动作头替代 OpenVLA 的离散动作 token —— 找回分桶损失的精度",
        "在冻结的 VLA 主干上做 rank-32 LoRA，可训练权重仅 1-2 GB",
        "OFT+ 增加 FiLM 条件与 3 路相机（顶视 + 双手腕），用于 ALOHA 真机任务",
      ],
    },
    workflow: {
      en: [
        "git clone github.com/moojink/openvla-oft; install pinned torch==2.2.0 + peft==0.11.1",
        "Evaluate a pretrained checkpoint: run_libero_eval.py --pretrained_checkpoint <hf-id>",
        "Fine-tune: 8× A100 with finetune.py — config selects OFT vs OFT+ and L1 vs diffusion head",
        "Merge LoRA adapter then deploy via FastAPI server-client for ALOHA inference",
      ],
      zh: [
        "git clone github.com/moojink/openvla-oft；安装锁定版本 torch==2.2.0 + peft==0.11.1",
        "评估预训练检查点：run_libero_eval.py --pretrained_checkpoint <hf-id>",
        "微调：8× A100，运行 finetune.py —— 配置选择 OFT 还是 OFT+、L1 还是扩散头",
        "合并 LoRA 适配器，再用 FastAPI 服务端-客户端在 ALOHA 上推理",
      ],
    },
  },
  "18-multimodal/segment-anything-model": {
    what: {
      en: "Meta's zero-shot image segmentation — give it any prompt (point, box, text) and it segments the object.",
      zh: "Meta 的零样本图像分割 —— 给任意提示（点、框、文本）即可分割对象。",
    },
    how: {
      en: [
        "Image encoder (ViT-H) computes a one-shot image embedding",
        "Lightweight prompt encoder + mask decoder run in milliseconds per prompt",
        "Trained on SA-1B: 11M images, 1B masks",
      ],
      zh: [
        "图像编码器（ViT-H）一次性计算图像嵌入",
        "轻量 prompt 编码器 + 掩码解码器，每个 prompt 仅几毫秒",
        "在 SA-1B（11M 图像、1B 掩码）上训练",
      ],
    },
    workflow: {
      en: [
        "predictor = SamPredictor(sam_model)",
        "predictor.set_image(image) — one-time encoder pass",
        "masks, scores, _ = predictor.predict(point_coords, point_labels)",
        "Pick highest-scoring mask or ensemble",
      ],
      zh: [
        "predictor = SamPredictor(sam_model)",
        "predictor.set_image(image) —— 一次性编码",
        "masks, scores, _ = predictor.predict(point_coords, point_labels)",
        "选择得分最高的掩码或集成多个",
      ],
    },
  },
  "18-multimodal/stable-diffusion-image-generation": {
    what: {
      en: "Open-source text-to-image diffusion — Diffusers library, ControlNet, LoRA fine-tuning, SDXL, Flux.",
      zh: "开源文本到图像扩散模型 —— Diffusers 库、ControlNet、LoRA 微调、SDXL、Flux。",
    },
    how: {
      en: [
        "Latent diffusion: U-Net or DiT denoises in 4× downsampled VAE latent space",
        "Text conditioning via CLIP / T5 cross-attention",
        "ControlNet adds structural conditioning (pose, depth, edges)",
      ],
      zh: [
        "潜空间扩散：U-Net 或 DiT 在 4 倍下采样的 VAE 潜空间去噪",
        "通过 CLIP / T5 交叉注意力实现文本条件",
        "ControlNet 增加结构条件（姿态、深度、边缘）",
      ],
    },
    workflow: {
      en: [
        "pipe = StableDiffusionXLPipeline.from_pretrained(name)",
        "pipe.to('cuda'); enable xFormers attention",
        "image = pipe(prompt, num_inference_steps=30).images[0]",
        "Optional: pipe.load_lora_weights('your-lora') for style",
      ],
      zh: [
        "pipe = StableDiffusionXLPipeline.from_pretrained(name)",
        "pipe.to('cuda')；启用 xFormers 注意力",
        "image = pipe(prompt, num_inference_steps=30).images[0]",
        "可选：pipe.load_lora_weights('your-lora') 应用风格",
      ],
    },
  },
  "18-multimodal/whisper": {
    what: {
      en: "OpenAI's robust multilingual speech recognition — 99 languages, transcription, translation to English, and language identification across six model sizes (tiny → large → turbo).",
      zh: "OpenAI 的多语种鲁棒语音识别 —— 支持 99 种语言的转录、翻译为英文与语种识别，提供六种模型尺寸（tiny → large → turbo）。",
    },
    how: {
      en: [
        "Encoder-decoder Transformer trained on 680,000 hours of weakly-supervised audio",
        "Single model handles transcription, translation, language ID, and timestamps via task tokens",
        "Six sizes from tiny (39M, 1 GB VRAM) to large (1550M, 10 GB VRAM); turbo trades a tiny accuracy hit for ~8× speed",
      ],
      zh: [
        "编码器-解码器 Transformer，在 68 万小时弱监督音频上训练",
        "通过任务 token，单模型同时完成转录、翻译、语种识别与时间戳",
        "六种尺寸：tiny（39M、1 GB 显存）到 large（1550M、10 GB 显存）；turbo 牺牲极小精度换取约 8 倍速度",
      ],
    },
    workflow: {
      en: [
        "pip install -U openai-whisper; ensure ffmpeg is installed",
        "model = whisper.load_model('turbo')",
        "result = model.transcribe('audio.mp3') — returns text + timestamped segments",
        "For batched / GPU serving use faster-whisper or transformers AutomaticSpeechRecognitionPipeline",
      ],
      zh: [
        "pip install -U openai-whisper；确保已安装 ffmpeg",
        "model = whisper.load_model('turbo')",
        "result = model.transcribe('audio.mp3') —— 返回文本与带时间戳的分段",
        "需要批处理 / GPU 服务时改用 faster-whisper 或 transformers 的 AutomaticSpeechRecognitionPipeline",
      ],
    },
  },

  // ========== 19 EMERGING TECHNIQUES ==========
  "19-emerging-techniques/knowledge-distillation": {
    what: {
      en: "Compress large teacher models into smaller students via soft targets, hidden-state matching, and DPO distillation.",
      zh: "通过软标签、隐藏状态对齐、DPO 蒸馏，将大教师模型压缩为小学生模型。",
    },
    how: {
      en: [
        "Soft-target loss: student matches teacher's full output distribution",
        "Hidden-state distillation: align intermediate representations",
        "On-policy distillation: student generates, teacher provides preferences",
      ],
      zh: [
        "软标签损失：学生匹配教师的完整输出分布",
        "隐藏状态蒸馏：对齐中间层表示",
        "On-policy 蒸馏：学生生成，教师提供偏好",
      ],
    },
    workflow: {
      en: [
        "Load teacher (large, frozen) and student (small, trainable)",
        "loss = KL(student_logits/T || teacher_logits/T) * T²",
        "Optionally add hidden-state MSE term",
        "Evaluate student on benchmarks vs. teacher",
      ],
      zh: [
        "加载教师（大、冻结）与学生（小、可训练）",
        "loss = KL(student_logits/T || teacher_logits/T) * T²",
        "可加入隐藏状态 MSE 损失项",
        "在基准上评估学生与教师",
      ],
    },
  },
  "19-emerging-techniques/long-context": {
    what: {
      en: "Extend context windows from 4K to 128K-1M+ via RoPE scaling, YaRN, LongLoRA, and ring attention.",
      zh: "通过 RoPE 缩放、YaRN、LongLoRA、Ring Attention 将上下文从 4K 扩展到 128K-1M+。",
    },
    how: {
      en: [
        "Position interpolation / NTK-aware scaling stretches RoPE frequencies",
        "YaRN combines NTK-by-parts with attention temperature for better extrapolation",
        "Ring attention shards KV across devices to fit million-token context",
      ],
      zh: [
        "位置插值 / NTK 感知缩放拉伸 RoPE 频率",
        "YaRN 结合 NTK-by-parts 与注意力温度，外推效果更好",
        "Ring Attention 将 KV 分片到多设备以容纳百万级上下文",
      ],
    },
    workflow: {
      en: [
        "Pick scaling strategy (PI / NTK / YaRN)",
        "Adjust rope_scaling in config + fine-tune on long-context data",
        "Evaluate on RULER, LongBench, needle-in-haystack",
        "Deploy with chunked prefill for memory efficiency",
      ],
      zh: [
        "选择缩放策略（PI / NTK / YaRN）",
        "调整 config 中的 rope_scaling 并在长上下文数据上微调",
        "在 RULER、LongBench、大海捞针上评估",
        "用分块预填充部署以节省显存",
      ],
    },
  },
  "19-emerging-techniques/mergekit": {
    what: {
      en: "Merge fine-tuned models without GPU — SLERP, TIES, DARE, Task Arithmetic, Frankenmerge in a single CLI.",
      zh: "无 GPU 合并微调模型 —— 通过单一 CLI 支持 SLERP、TIES、DARE、Task Arithmetic、Frankenmerge。",
    },
    how: {
      en: [
        "SLERP: spherical interpolation between two model weight tensors",
        "TIES / DARE: prune low-magnitude deltas, then sign-vote to merge many models",
        "Frankenmerge: stitch layers from different models into one stack",
      ],
      zh: [
        "SLERP：在两个模型权重张量间做球面插值",
        "TIES / DARE：先剪掉低幅值 delta，再通过符号投票合并多个模型",
        "Frankenmerge：将不同模型的层拼接成一个新堆叠",
      ],
    },
    workflow: {
      en: [
        "Author merge_config.yml with method + models",
        "mergekit-yaml merge_config.yml ./merged --copy-tokenizer",
        "Evaluate merged model on benchmarks",
        "Iterate on weights / density / methods",
      ],
      zh: [
        "编写 merge_config.yml，指定方法与模型",
        "mergekit-yaml merge_config.yml ./merged --copy-tokenizer",
        "在基准上评估合并后的模型",
        "迭代调整权重 / 密度 / 方法",
      ],
    },
  },
  "19-emerging-techniques/model-merging": {
    what: {
      en: "Combine specialist models into a generalist via weight interpolation and task arithmetic — no extra training.",
      zh: "通过权重插值与任务算术，将多个专家模型合成为通才模型 —— 无需额外训练。",
    },
    how: {
      en: [
        "Task vector = θ_finetuned − θ_base; arithmetic on these vectors transfers skills",
        "Linear / SLERP / TIES merging strategies for combining vectors",
        "Mixture of Experts via merge avoids serving multiple models",
      ],
      zh: [
        "任务向量 = θ_finetuned − θ_base；对其做算术可迁移技能",
        "线性 / SLERP / TIES 合并策略组合任务向量",
        "通过合并实现 MoE，避免同时部署多个模型",
      ],
    },
    workflow: {
      en: [
        "Compute task vectors for each specialist",
        "Combine with chosen merge method + coefficients",
        "Apply combined vector to base weights",
        "Evaluate cross-task — tune coefficients to balance",
      ],
      zh: [
        "为每个专家计算任务向量",
        "用选定方法与系数组合",
        "把合成向量加回基础权重",
        "跨任务评估 —— 调整系数以平衡",
      ],
    },
  },
  "19-emerging-techniques/model-pruning": {
    what: {
      en: "Structured and unstructured pruning — SparseGPT, Wanda, magnitude pruning to shrink models 50%+ with minimal loss.",
      zh: "结构化与非结构化剪枝 —— SparseGPT、Wanda、magnitude 剪枝可压缩 50%+ 而精度损失极小。",
    },
    how: {
      en: [
        "Wanda: importance = |weight| × ||activation||₂, pruned per-output-row",
        "SparseGPT: layer-wise weight reconstruction after pruning each column",
        "Structured: prune entire heads / channels for actual speedup on hardware",
      ],
      zh: [
        "Wanda：重要性 = |权重| × ||激活||₂，按输出行剪枝",
        "SparseGPT：对每列剪枝后做层级权重重构",
        "结构化：剪掉整头/通道，硬件上才能真正加速",
      ],
    },
    workflow: {
      en: [
        "Calibrate on ~128 samples for activation stats",
        "Apply Wanda or SparseGPT layer by layer",
        "Optionally fine-tune to recover lost accuracy",
        "Deploy with sparse-aware kernel (e.g., 2:4 sparsity on Ampere+)",
      ],
      zh: [
        "在约 128 条样本上校准激活统计",
        "逐层应用 Wanda 或 SparseGPT",
        "可选：微调恢复精度",
        "用稀疏感知核函数部署（如 Ampere+ 上的 2:4 稀疏）",
      ],
    },
  },
  "19-emerging-techniques/moe-training": {
    what: {
      en: "Mixture of Experts training — sparse activation, expert parallelism, load balancing, router training.",
      zh: "Mixture of Experts 训练 —— 稀疏激活、专家并行、负载均衡、路由器训练。",
    },
    how: {
      en: [
        "Router (linear + softmax + top-K) selects K experts per token",
        "Expert parallelism distributes experts across GPUs",
        "Auxiliary load-balancing loss prevents expert collapse",
      ],
      zh: [
        "路由器（线性 + softmax + top-K）为每个 token 选 K 个专家",
        "专家并行将专家分到多 GPU",
        "辅助负载均衡损失防止专家坍缩",
      ],
    },
    workflow: {
      en: [
        "Define MoE block: gate + N experts (often FFN)",
        "Use expert-parallel device mesh",
        "Add aux load-balance + router-z losses to total loss",
        "Monitor expert utilization throughout training",
      ],
      zh: [
        "定义 MoE 模块：gate + N 个专家（通常是 FFN）",
        "使用专家并行的 device mesh",
        "在总损失中加入负载均衡与 router-z 损失",
        "训练过程中持续监控专家利用率",
      ],
    },
  },
  "19-emerging-techniques/speculative-decoding": {
    what: {
      en: "Speed up inference 2-3x — small draft model proposes K tokens, big target model verifies them in parallel.",
      zh: "推理加速 2-3 倍 —— 小 draft 模型一次提议 K 个 token，大 target 模型并行验证。",
    },
    how: {
      en: [
        "Draft model autoregressively generates K candidate tokens",
        "Target model scores all K in one forward pass",
        "Accept longest matching prefix; resample first rejected token",
      ],
      zh: [
        "Draft 模型自回归生成 K 个候选 token",
        "Target 模型一次前向同时打分所有 K 个",
        "接受最长匹配前缀；从第一个被拒绝的 token 重采样",
      ],
    },
    workflow: {
      en: [
        "Pick draft model (smaller distill / EAGLE / Medusa heads)",
        "Configure spec_decoding in vLLM / TensorRT-LLM",
        "Tune K based on acceptance rate (~3-5 typical)",
        "Verify quality matches non-speculative baseline",
      ],
      zh: [
        "选择 draft 模型（较小的蒸馏模型 / EAGLE / Medusa 头）",
        "在 vLLM / TensorRT-LLM 中配置 spec_decoding",
        "根据接受率调整 K（典型 3-5）",
        "验证质量与非推测基线一致",
      ],
    },
  },

  // ========== 20 ML PAPER WRITING ==========
  "20-ml-paper-writing/academic-plotting": {
    what: {
      en: "Publication-quality figures — error bars, statistical significance, color-blind palettes, vectorized PDF export.",
      zh: "出版级图表 —— 误差棒、显著性标注、色盲友好配色、矢量 PDF 导出。",
    },
    how: {
      en: [
        "Matplotlib with 'science' or 'bmh' style + serif fonts to match LaTeX",
        "Seaborn for statistical plots with built-in CIs and bootstrapping",
        "Save as PDF (vector) for sharp paper figures at any zoom",
      ],
      zh: [
        "Matplotlib 使用 'science' 或 'bmh' 风格 + serif 字体匹配 LaTeX",
        "Seaborn 用于统计图，内置置信区间与 bootstrap",
        "保存为 PDF（矢量），任意缩放都清晰",
      ],
    },
    workflow: {
      en: [
        "plt.style.use(['science', 'no-latex'])",
        "Plot with explicit color-blind palette (e.g., colorbrewer)",
        "Annotate significance: ns / * / ** / ***",
        "fig.savefig('fig.pdf', bbox_inches='tight')",
      ],
      zh: [
        "plt.style.use(['science', 'no-latex'])",
        "使用色盲友好的显式配色（如 colorbrewer）",
        "标注显著性：ns / * / ** / ***",
        "fig.savefig('fig.pdf', bbox_inches='tight')",
      ],
    },
  },
  "20-ml-paper-writing/ml-paper-writing": {
    what: {
      en: "End-to-end guide to writing an ML paper — structure, related work, experiments, LaTeX templates for top venues.",
      zh: "ML 论文写作的端到端指南 —— 结构、相关工作、实验、顶会 LaTeX 模板。",
    },
    how: {
      en: [
        "Standard structure: Abstract → Intro → Related → Method → Experiments → Conclusion",
        "Each section serves a specific purpose; lead with the contribution",
        "Templates for NeurIPS, ICML, ICLR, ACL, AAAI ready-made",
      ],
      zh: [
        "标准结构：Abstract → Intro → Related → Method → Experiments → Conclusion",
        "每节有明确目的；开门见山讲贡献",
        "提供 NeurIPS、ICML、ICLR、ACL、AAAI 现成模板",
      ],
    },
    workflow: {
      en: [
        "Outline contribution + 3-bullet story before writing",
        "Draft method + experiments first; intro last",
        "Self-review against reviewer rubric (novelty, soundness, clarity)",
        "Compile + submit; archive on arXiv",
      ],
      zh: [
        "动笔前先列出贡献与三点故事大纲",
        "先写方法与实验；引言留到最后",
        "按审稿评分标准（新颖性、严谨性、清晰度）自审",
        "编译并投稿；同时挂到 arXiv",
      ],
    },
  },
  "20-ml-paper-writing/presenting-conference-talks": {
    what: {
      en: "Craft compelling research talks — narrative arc, slide design, live demos, Q&A handling.",
      zh: "打造引人入胜的研究演讲 —— 叙事弧、幻灯片设计、现场演示、Q&A 应对。",
    },
    how: {
      en: [
        "Story arc: hook → problem → insight → method → result → vision",
        "1 idea per slide, large fonts, minimal text, generous whitespace",
        "Rehearse 3+ times with timing and difficult-question drill",
      ],
      zh: [
        "故事弧：引子 → 问题 → 洞见 → 方法 → 结果 → 愿景",
        "每张幻灯片一个观点、大字号、少文字、留白充足",
        "彩排 3 次以上，包含计时与刁钻问题演练",
      ],
    },
    workflow: {
      en: [
        "Draft outline as 5-7 section headers",
        "Build hero slide for each section",
        "Add transitions and animations for clarity",
        "Run timing rehearsal + invite tough Q&A",
      ],
      zh: [
        "先写 5-7 个章节标题作为大纲",
        "为每节做一张『核心』幻灯片",
        "加入过渡与动画提升清晰度",
        "做计时彩排，并邀请同事提刁难问题",
      ],
    },
  },
  "20-ml-paper-writing/systems-paper-writing": {
    what: {
      en: "Writing MLSys / OSDI papers — evaluation rigor, microbenchmarks, ablations, scaling studies.",
      zh: "MLSys / OSDI 类论文写作 —— 强调评估严谨性、微基准、消融、scaling 研究。",
    },
    how: {
      en: [
        "Lead with end-to-end speedup, then decompose with microbenchmarks",
        "Ablate each system component to attribute the gain",
        "Show scaling on multiple GPU counts / model sizes",
      ],
      zh: [
        "先讲端到端加速，再用微基准拆解",
        "消融每个系统组件以归因性能提升",
        "在不同 GPU 数 / 模型尺寸上展示扩展性",
      ],
    },
    workflow: {
      en: [
        "Define baseline + your system + headline metric",
        "Run end-to-end benchmark on real workload",
        "Ablate: swap each component for the baseline equivalent",
        "Sweep scale axes; report median + p99",
      ],
      zh: [
        "定义基线 + 你的系统 + 头条指标",
        "在真实工作负载上做端到端基准",
        "消融：依次将每个组件替换为基线等价物",
        "扫描扩展轴；报告中位数 + p99",
      ],
    },
  },

  // ========== 21 RESEARCH IDEATION ==========
  "21-research-ideation/brainstorming-research-ideas": {
    what: {
      en: "Systematic methods for generating novel AI research ideas — literature gaps, analogies, contradictions.",
      zh: "系统化的 AI 研究构思方法 —— 文献空白、类比、矛盾。",
    },
    how: {
      en: [
        "Map the literature into a 2D taxonomy; look for empty quadrants",
        "Cross-pollinate: apply method from field A to problem in field B",
        "Identify open contradictions in published results — investigate why",
      ],
      zh: [
        "将文献映射为二维分类法；寻找空缺象限",
        "跨域结合：把 A 领域的方法用到 B 领域的问题上",
        "识别已发表结果中的公开矛盾 —— 探究原因",
      ],
    },
    workflow: {
      en: [
        "Read 50 recent papers in target subfield",
        "Build 2D landscape (axes = key dimensions)",
        "List gaps + contradictions + analogies",
        "Score ideas by novelty × feasibility × impact",
      ],
      zh: [
        "阅读目标子领域的 50 篇近期论文",
        "构建二维地图（坐标轴 = 关键维度）",
        "列出空白 + 矛盾 + 类比",
        "按 新颖性 × 可行性 × 影响力 给想法打分",
      ],
    },
  },
  "21-research-ideation/creative-thinking-for-research": {
    what: {
      en: "Lateral thinking, SCAMPER, morphological analysis — structured techniques for hypothesis generation.",
      zh: "侧向思考、SCAMPER、形态学分析 —— 结构化的假设生成技巧。",
    },
    how: {
      en: [
        "SCAMPER: Substitute / Combine / Adapt / Modify / Put-to-other-use / Eliminate / Reverse",
        "Morphological: enumerate dimensions and combinations exhaustively",
        "First-principles: deconstruct assumptions, rebuild from physics / math",
      ],
      zh: [
        "SCAMPER：替换/组合/改造/修改/挪用/删减/反转",
        "形态学：穷举维度与组合",
        "第一性原理：拆解假设，从物理/数学重新构建",
      ],
    },
    workflow: {
      en: [
        "Pick target problem and list assumptions",
        "Apply SCAMPER to each assumption",
        "Build morphological matrix; enumerate cells",
        "Filter promising candidates with feasibility check",
      ],
      zh: [
        "选定目标问题并列出假设",
        "对每条假设应用 SCAMPER",
        "建立形态学矩阵；枚举单元格",
        "用可行性检查筛选有前景的候选",
      ],
    },
  },

  // ========== 0 AUTORESEARCH ==========
  "0-autoresearch-skill/autoresearch": {
    what: {
      en: "Two-loop autonomous research orchestration — inner loop runs rapid experiments, outer loop synthesizes findings.",
      zh: "两层循环的自主研究编排 —— 内循环跑快速实验，外循环综合结论。",
    },
    how: {
      en: [
        "Inner loop: hypothesis → experiment design → run → measure → next hypothesis",
        "Outer loop: synthesize findings → revise research direction → restart inner",
        "All 21 domain skills available as callable tools to the orchestrator",
      ],
      zh: [
        "内循环：假设 → 实验设计 → 运行 → 测量 → 下一假设",
        "外循环：综合结论 → 修订研究方向 → 重启内循环",
        "21 个领域技能作为可调用工具供编排器使用",
      ],
    },
    workflow: {
      en: [
        "Define research goal + budget (compute, time)",
        "Orchestrator spawns inner-loop experiments in parallel",
        "Outer loop reads results, updates plan, allocates next batch",
        "Final report compiled when budget or goal met",
      ],
      zh: [
        "定义研究目标 + 预算（算力、时间）",
        "编排器并行启动内循环实验",
        "外循环读取结果、更新计划、分配下一批",
        "达到预算或目标时编译最终报告",
      ],
    },
  },
} satisfies Record<SkillKey, SkillOutline>;
