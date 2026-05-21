# Project Rules

## Stack

当前项目是一个基于以下技术栈的 AI 笔友应用：

- Next.js：应用框架与 App Router 路由
- Supabase：数据库、Auth、RLS 与数据访问
- DeepSeek：服务端 AI 回信生成
- Vercel：部署与 cron 定时任务

## Directory Structure

### `app/`

`app/` 是当前项目的路由目录。

- 页面路由放在 `app/**/page.tsx`
- API route 放在 `app/api/**/route.ts`
- Server Actions 可放在对应页面目录的 `actions.ts`
- 不要把新路由放到 `src/app/`，除非项目结构整体迁移

### `src/lib`

`src/lib` 是业务工具、数据访问层和服务端逻辑的主要目录。

- `src/lib/db`：Supabase 数据访问层
- `src/lib/server`：复杂业务流程、跨表事务式流程、可复用服务端逻辑
- `src/lib/ai`：AI prompt、AI 生成、AI provider 与安全处理
- `src/lib/mock`：开发或兜底展示用 mock 数据
- `src/lib/utils`：通用工具函数

## API Route Rules

API route 只负责 request/response：

- 解析请求参数
- 校验登录或 header
- 调用 `src/lib/server` 或 `src/lib/db`
- 返回 JSON response

复杂业务逻辑不要堆在 API route 里。多个 API 或 cron 需要复用的流程，应抽到 `src/lib/server`。

## Supabase Rules

Supabase 查询尽量放到 `src/lib/db`。

如果一个流程需要跨多张表，例如生成回信、插入 replies、更新 letters、插入 user_penpals，应放到 `src/lib/server`，并在内部调用数据访问层或使用明确的服务端 Supabase client。

不要随意改数据库结构。

修改涉及数据库的逻辑前，先检查：

- 当前表结构
- RLS 假设
- 已有查询函数
- 页面和 API 的数据流
- 是否已有兼容旧字段的 fallback

## AI Rules

AI 相关逻辑放到 `src/lib/ai`。

- prompt 放在 `src/lib/ai/prompts.ts`
- 回信生成入口放在 `src/lib/ai/generateReply.ts`
- provider 放在 `src/lib/ai/providers`
- safety 相关逻辑放在 `src/lib/ai/safety.ts`

DeepSeek 只能在 server side 调用，不要在 client component 中调用。

## Environment Rules

不要在 client component 中读取 server-only env。

不要把 service role key 暴露到浏览器。

- 可以暴露给浏览器的变量必须使用 `NEXT_PUBLIC_` 前缀
- `DEEPSEEK_API_KEY`、`CRON_SECRET`、`SUPABASE_SERVICE_ROLE_KEY` 等只能在服务端使用
- 不要把 server-only env 传给 client component props，除非它本身不是秘密

## Change Discipline

修改前先检查现有数据流。

不要为了完成一个小需求顺手改：

- Auth
- 数据库结构
- RLS
- 路由结构
- UI 风格
- 全局配置

除非用户明确要求，否则保持改动边界小、目的单一、可验证。
