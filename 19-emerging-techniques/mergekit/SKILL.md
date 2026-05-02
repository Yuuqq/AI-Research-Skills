---
  title: "Mergekit"
  description: "Toolkit for merging multiple fine-tuned language models without requiring GPU compute. Supports SLERP, TIES, DARE, Task Arithmetic, Frankenmerging (layer stacking), and Evolutionary merge methods. Used to combine specialized models, reduce catastrophic forgetting, and create generalist models from specialists."
  skillName: "mergekit"
  skillVersion: "1.0.0"
  skillAuthor: "Orchestra Research"
  skillLicense: "MIT"
  skillTags: ["Model Merging", "Mergekit", "SLERP", "TIES", "DARE", "Task Arithmetic", "Frankenmerge", "Model Fusion", "No GPU Required"]
  skillDeps: ["mergekit", "transformers", "torch", "pyyaml"]
  ---

  | | |
  |---|---|
  | **Version** | 1.0.0 |
  | **Author** | Orchestra Research |
  | **License** | MIT |
  | **Tags** | `Model Merging` `Mergekit` `SLERP` `TIES` `DARE` `Task Arithmetic` |
  | **Dependencies** | `mergekit` `transformers` `torch` |


  # Mergekit — Merge LLMs Without Training

  Combine specialized fine-tuned models into a single capable model. No gradient computation required.

  ## When to use Mergekit

  **Use Mergekit when:**
  - Combining domain-specific fine-tunes (coding + math + reasoning)
  - Avoiding catastrophic forgetting from sequential fine-tuning
  - Creating generalist models from specialist checkpoints
  - No GPU budget for continued training
  - Experimenting with model fusion research

  **Metrics**:
  - **5,000+ GitHub stars**
  - No GPU required for most merge methods (CPU only)
  - Supports all popular architectures (Llama, Mistral, Qwen, Falcon, BLOOM)
  - Used to create top-ranked Open LLM Leaderboard models

  ## Quick start

  ```bash
  pip install mergekit

  # Or from source (for latest methods)
  git clone https://github.com/arcee-ai/mergekit
  cd mergekit && pip install -e .
  ```

  ## Merge methods

  ### SLERP — smooth interpolation between two models

  ```yaml
  # slerp_merge.yaml
  models:
    - model: mistralai/Mistral-7B-Instruct-v0.2
      parameters:
        weight: 0.6
    - model: HuggingFaceH4/zephyr-7b-beta
      parameters:
        weight: 0.4

  merge_method: slerp
  base_model: mistralai/Mistral-7B-v0.1
  dtype: bfloat16
  ```

  ```bash
  mergekit-yaml slerp_merge.yaml ./merged-model --copy-tokenizer
  ```

  ### TIES — handle parameter conflicts from multiple models

  ```yaml
  # ties_merge.yaml
  models:
    - model: meta-llama/Llama-3.1-8B-Instruct
      parameters:
        density: 0.7   # trim 30% of delta weights
        weight: 1.0
    - model: my-org/llama-3.1-8b-math-finetuned
      parameters:
        density: 0.7
        weight: 1.0
    - model: my-org/llama-3.1-8b-code-finetuned
      parameters:
        density: 0.7
        weight: 1.0

  merge_method: ties
  base_model: meta-llama/Llama-3.1-8B
  dtype: bfloat16
  parameters:
    normalize: true
  ```

  ### DARE — sparsify before merging (reduces interference)

  ```yaml
  merge_method: dare_ties
  base_model: meta-llama/Llama-3.1-8B
  models:
    - model: my-org/llama-math
      parameters:
        density: 0.5
        weight: 1.0
    - model: my-org/llama-code
      parameters:
        density: 0.5
        weight: 1.0
  dtype: bfloat16
  ```

  ### Task Arithmetic — add/subtract capabilities

  ```yaml
  # Boost math, reduce toxicity
  merge_method: task_arithmetic
  base_model: meta-llama/Llama-3.1-8B
  models:
    - model: my-org/llama-math
      parameters:
        weight: 1.5   # amplify math
    - model: my-org/llama-toxic  
      parameters:
        weight: -1.0  # subtract toxicity
  dtype: bfloat16
  ```

  ### Frankenmerge — layer stacking (creates larger models)

  ```yaml
  # Stack layers from two 7B models → 14B "Frankenstein" model
  merge_method: passthrough
  slices:
    - sources:
        - model: mistralai/Mistral-7B-v0.1
          layer_range: [0, 16]  # first 16 layers
    - sources:
        - model: HuggingFaceH4/zephyr-7b-beta
          layer_range: [16, 32]  # last 16 layers
  dtype: bfloat16
  ```

  ## Python API

  ```python
  import yaml
  from mergekit.config.models import MergeConfiguration
  from mergekit.merge import MergeOptions, run_merge

  # Define merge config
  config_dict = {
      "merge_method": "slerp",
      "models": [
          {"model": "mistralai/Mistral-7B-Instruct-v0.2", "parameters": {"weight": 0.6}},
          {"model": "HuggingFaceH4/zephyr-7b-beta", "parameters": {"weight": 0.4}},
      ],
      "base_model": "mistralai/Mistral-7B-v0.1",
      "dtype": "bfloat16",
  }

  config = MergeConfiguration.model_validate(config_dict)

  run_merge(
      merge_config=config,
      out_path="./merged-model",
      options=MergeOptions(
          copy_tokenizer=True,
          lazy_unpickle=True,
          low_cpu_memory=True,  # stream weights to reduce RAM usage
      )
  )
  ```

  ## Evolutionary Merge (EvoMerge)

  ```python
  from mergekit.evo.config import EvolMergeConfiguration
  from mergekit.evo.runner import EvolMergeRunner

  # Auto-optimize merge weights using CMA-ES
  config = EvolMergeConfiguration(
      models=["my-org/model-a", "my-org/model-b", "my-org/model-c"],
      base_model="meta-llama/Llama-3.1-8B",
      merge_method="dare_ties",
      evaluation_task="arc_challenge",
      num_generations=50,
      population_size=10,
  )

  runner = EvolMergeRunner(config, device="cuda")
  best_config, best_score = runner.run()
  print(f"Best merge score: {best_score:.4f}")
  print(best_config)
  ```

  ## Common pitfalls

  - **Architecture mismatch**: All merged models must share the same base architecture
  - **OOM on merge**: Use `--low-cpu-memory` flag for large models
  - **Tokenizer conflicts**: Use `--copy-tokenizer` from the best tokenizer model
  - **SLERP with 3+ models**: Use TIES or DARE instead; SLERP is binary only

  ## References
  - [Mergekit GitHub](https://github.com/arcee-ai/mergekit)
  - [TIES paper](https://arxiv.org/abs/2306.01708)
  - [DARE paper](https://arxiv.org/abs/2311.03099)
  - [EvoMerge paper](https://arxiv.org/abs/2403.13187)
  