# ARABAI 项目交接说明（给下一接手团队）

交接日期：2026-06-29 10:28 CST

仓库：`https://github.com/menzexhibition/arabai-top.git`

当前分支：`main`

交接基准提交：`b299bacb05f35d040d49232664e3e2fd29b0addc`（`Add model marketplace links to Arabic navigation`）

## 1. 项目定位

ARABAI 是面向阿拉伯语用户的 AI 教育与轻量产品入口。

当前仓库同时包含：

- 静态官网：`arabai.top`，GitHub Pages/静态页面模式。
- App 预览入口：`/app/`，展示钱包、任务、模型市场、沙盒充值等前端体验。
- Vercel/API MVP：`api/` 和 `server/`，用于登录、钱包、任务估算、任务确认、充值沙盒、Supabase 持久化、New API/OpenAI-compatible 网关适配。
- 产品/技术文档：`app-framework/` 和 `docs/`。
- AI Agent 配置库：`agents/`。

重要原则：`arabai.top` 的公开内容和导航应优先使用自然完整的阿拉伯语，不要半英半阿；支付和充值必须保持“沙盒/规划/未正式销售”的清晰状态，直到法律、支付、隐私、退款和客服流程全部完成。

## 2. 当前仓库状态

交接前已确认：

```bash
git rev-parse HEAD
# b299bacb05f35d040d49232664e3e2fd29b0addc

git rev-parse origin/main
# b299bacb05f35d040d49232664e3e2fd29b0addc

git branch -vv
# main 与 origin/main 同步
```

也就是说，交接前已检查并修复过的程序修改已经上传到远端 `main`。本交接文件提交后，新团队应以最新 `origin/main` 为准拉取。

## 3. 已完成/已修复的主要内容

### 3.1 静态官网与阿语内容

- 已有阿语/英语入口页面：`index.html`、`ar.html`、`en.html`。
- 已有分层内容页面：`ar-beginner.html`、`ar-advanced.html`、`ar-expert.html`、`ar-tutorials.html`、`ar-community.html`、`ar-credits.html`。
- 已有法律/披露页面：`privacy.html`、`terms.html`、`refund.html`、`disclosure.html`。
- 已将模型市场入口加入阿语导航，指向 `/app/#model-marketplace`。
- 已强调模型市场是“销售目录/展示目录”，不是开发者 API 页面。

### 3.2 `/app/` 产品预览

关键文件：

- `app/index.html`
- `app/app.js`
- `app/styles.css`

当前 `/app/` 包含：

- App 状态/服务模式提示。
- 模型市场区块。
- 任务选择与任务估算体验。
- 钱包、交易记录、每日奖励、充值沙盒相关 UI。
- 静态公开环境下应保持离线/预览状态，不能假装真实后端已完全接通。

最近相关提交：

- `b299bac`：阿语导航加入模型市场入口。
- `981ce41`：模型市场展示完整实时模型目录。
- `678e9c6`：使用实时价格模型数据展示 ARABAI 模型市场。
- `fa04339`：使用官方模型名称。
- `cd7afdf`：注册前展示模型市场。

### 3.3 API / Backend MVP

关键文件：

- `server/app.js`
- `server/supabase-store.js`
- `api/health.js`
- `api/me.js`
- `api/auth/verified-signin.js`
- `api/auth/sign-out.js`
- `api/wallet/packages.js`
- `api/wallet/transactions.js`
- `api/wallet/claim-daily-login.js`
- `api/wallet/top-up/create-checkout.js`
- `api/wallet/top-up/webhook.js`
- `api/tasks/index.js`
- `api/tasks/estimate.js`
- `api/tasks/confirm.js`

已具备的能力：

- Demo 模式登录/钱包/交易/任务。
- 可选 Supabase 持久化模式。
- 虚拟支付沙盒模式。
- Lemon Squeezy 真实充值开关框架，但不应直接上线真实收费。
- OpenAI-compatible / New API 网关适配框架。
- 健康检查接口可返回安全诊断信息，不能泄露密钥。

### 3.4 Supabase 持久化

关键文件：

- `server/supabase-store.js`
- `app-framework/database/schema.sql`
- `VERCEL_SUPABASE_ENABLE_CHECKLIST.md`

当前设计：

- 默认不启用 Supabase，避免没有数据库时线上崩溃。
- 只有 `ENABLE_SUPABASE_STORE=true` 且 Supabase 变量齐全时才进入持久化。
- Service role key 必须只放服务端，绝不能出现在浏览器端、静态页面或日志里。

### 3.5 支付/充值

关键文件：

- `docs/payments/VIRTUAL_SANDBOX_RECHARGE.md`
- `app-framework/providers/payments.md`
- `api/wallet/top-up/create-checkout.js`
- `api/wallet/top-up/webhook.js`
- `server/app.js`

当前状态：

- 虚拟充值沙盒可用于端到端测试，不产生真实扣款。
- 真实 Lemon Squeezy 支付只保留框架和开关，不建议新团队直接启用。
- 公开页面文案必须避免“现在可购买/现在可充值”的误导。

### 3.6 AI 网关 / New API

关键文件：

- `app-framework/providers/real-ai-gateway-setup.md`
- `app-framework/implementation-ai-credit-newapi-2026-06-23.md`
- `app-framework/implementation-arabai-owned-newapi-gateway-2026-06-24.md`
- `tests/new-api-gateway.test.mjs`
- `server/app.js`

当前状态：

- 支持通过环境变量切换真实 AI 网关。
- 未配置时自动回退 mock gateway，避免线上崩溃。
- UI 展示的模型名应来自实际供应源价格目录，不能臆造。

## 4. 关键环境变量

以下只列变量名，不包含任何真实密钥。

### 4.1 Supabase

```env
ENABLE_SUPABASE_STORE=true
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### 4.2 支付沙盒

```env
PAYMENT_PROVIDER=virtual
PAYMENT_MODE=sandbox
ENABLE_REAL_RECHARGE=false
```

### 4.3 Lemon Squeezy 真实支付（暂不建议开启）

```env
ENABLE_REAL_RECHARGE=true
PAYMENT_PROVIDER=lemon_squeezy
LEMON_SQUEEZY_API_KEY=...
LEMON_SQUEEZY_STORE_ID=...
LEMON_SQUEEZY_WEBHOOK_SECRET=...
```

启用前必须完成：隐私政策、退款政策、支持邮箱、Webhook 幂等、失败退款、争议处理、测试订单闭环。

### 4.4 AI 网关

```env
USE_REAL_AI_GATEWAY=true
AI_GATEWAY_BASE_URL=...
AI_GATEWAY_API_KEY=...
AI_GATEWAY_TEXT_MODEL=...
AI_GATEWAY_IMAGE_MODEL=...
AI_GATEWAY_TIMEOUT_MS=60000
```

规则：密钥只允许存在服务端；浏览器端不得出现任何供应商 API Key。

## 5. 本地验证方式

安装依赖后运行：

```bash
npm run check
```

`package.json` 当前检查内容包括：

- `node --check server/app.js`
- `node --check server/supabase-store.js`
- `node --check api/**/*.js`
- `node --check app-framework/prototype/public/app.js`
- `node --check app-framework/mock-app/server.mjs`
- `node app-framework/prototype/tests/pricing.test.mjs`
- `node app-framework/mock-app/tests/mock-app.test.mjs`
- `node tests/api-handler.test.mjs`
- `node tests/new-api-gateway.test.mjs`

新团队接手后建议先执行：

```bash
git pull origin main
npm run check
git status --short
```

## 6. 部署/运行建议

### 6.1 静态官网

- 当前适合继续用 GitHub Pages 部署 `arabai.top`。
- 根目录静态文件、`ar/`、`en/`、`agents/`、`assets/` 都属于公开静态资源。
- GitHub Pages 上 `/api/*` 不会执行后端逻辑，404 是正常现象。
- 静态公开站不应主动探测 `/api/*` 并造成用户误解。

### 6.2 App/API

建议新团队二选一：

1. Vercel 承载 `api/` + `/app/`，逐步启用 Supabase 和 AI 网关。
2. 独立 Node 服务承载 `server/app.js`，再通过反向代理绑定 `api.arabai.top`。

不要把静态 GitHub Pages 当作后端运行环境。

### 6.3 域名建议

- `arabai.top`：公开教育官网。
- `app.arabai.top`：登录后产品。
- `api.arabai.top`：后端 API / New API gateway。

## 7. 剩余工作清单（建议新团队优先级）

### P0：接手前必须确认

- 拉取最新 `origin/main`，确认 commit 是否在 `b299bac` 之后包含本交接文件提交。
- 运行 `npm run check`。
- 检查 Vercel/GitHub Pages/域名 DNS 当前实际部署源。
- 确认所有密钥不在 Git 仓库中。
- 确认 `refund.html`、`privacy.html`、`terms.html`、`disclosure.html` 在线可访问。

### P1：上线前必须完成

- 建立正式 Supabase 项目并运行 `app-framework/database/schema.sql`。
- 打开 `ENABLE_SUPABASE_STORE=true` 前做完整注册、钱包、交易、任务历史测试。
- 完成真实登录验证，不要只依赖 demo/伪验证。
- 完成 AI 网关调用成本上限、失败退款、超时处理、日志脱敏。
- 真实充值继续保持关闭，直到支付审核、法律条款、客服流程完成。

### P2：产品体验完善

- `/app/` 从静态预览升级为真实登录应用。
- 模型市场继续从真实供应源同步，不手工臆造模型名。
- 普通用户优先选择任务，不直接选择底层模型名。
- 增加阿语引导示例：提示词优化、长文总结、PPT 大纲、视频脚本、低成本图片生成。
- 建立后台任务队列，媒体类任务不要长连接阻塞请求。

### P3：运营与合规

- 补充客服邮箱、退款流程、争议处理流程。
- 对所有充值/积分文案做合规审查。
- 建立基础数据看板：注册、活跃、任务失败率、AI 成本、充值转化。
- 建立内容发布流程，防止阿语页面与英语页面长期漂移。

## 8. 不要误解的地方

- `arabai.top` 不是 Menz 官网，不能把 ARABAI 改动描述成 Menz 网站改动。
- `/app/#model-marketplace` 是模型市场入口；`ar-developer-api.html` 是开发者/API Token 说明页，不是模型市场。
- 当前充值不是正式销售；沙盒充值只用于测试。
- 当前 AI 网关可以 mock，也可以接真实网关；未配置环境变量时 mock 是安全行为，不是故障。
- 免费积分不能承诺无限使用，也不能用于高成本视频、批量图片、高阶图片编辑等任务。
- 阿语 UI 要自然完整，尽量避免 `AI` 混在导航标签里，除非正文语境确实需要。

## 9. 推荐新团队阅读顺序

1. `README`/根目录文件结构：先了解静态站。
2. `app-framework/README.md`：了解产品框架。
3. `app-framework/api-contracts.md`：了解 API 合同。
4. `app-framework/app-ui-map.md`：了解 App 页面结构。
5. `app-framework/engineering-build-checklist.md`：了解工程检查项。
6. `VERCEL_SUPABASE_ENABLE_CHECKLIST.md`：了解 Supabase 启用流程。
7. `docs/payments/VIRTUAL_SANDBOX_RECHARGE.md`：了解沙盒充值。
8. `tests/api-handler.test.mjs` 与 `tests/new-api-gateway.test.mjs`：了解当前可验证行为。

## 10. 建议交接验收标准

新团队接手后，至少应能完成以下验收：

- `git pull origin main` 后工作树干净。
- `npm run check` 通过。
- `https://arabai.top/` 正常访问。
- `https://arabai.top/refund.html` 正常访问。
- `https://arabai.top/app/` 显示 App 预览和模型市场。
- 静态站没有把沙盒充值描述为真实销售。
- 服务端健康检查不泄露任何密钥。
- 若启用 Supabase，注册/钱包/交易记录可以持久化。
- 若启用真实 AI 网关，失败时能退还或释放预留积分。

## 11. 给 Benny 的交接备注

目前最适合交给新团队完成的是：

1. 把现有 MVP 从“静态预览 + API 框架”变成正式可登录产品。
2. 部署 Supabase 并做真实数据持久化。
3. 接入真实 AI 网关并设置成本保护。
4. 在支付合规完成前，只开放沙盒或 coming soon，不开放真实充值。
5. 继续保持阿语内容自然、清楚、可信。
