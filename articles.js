const beginnerArticles = [
  ["what-is-ai", "What Is AI?", "Imagine you just hired a very capable assistant who works fast, does not get tired, and can help with many kinds of work.", [["You have a new assistant", "For everyday users, AI is like a new assistant sitting beside you: it can write, plan, translate, draw, summarize, and give ideas, but it waits for you to tell it what to do."], ["But the assistant does not know your mind", "Like any new assistant, AI cannot guess your real goal, so a vague instruction brings a vague answer, and a clear instruction brings a much better result."], ["You give it the first task", "When you do not know how to start, AI can act like someone who opens the notebook for you and writes the first draft, first plan, or first idea."]], "Write a short and friendly email to a customer. Tell them their order is delayed by two days, apologize, and keep the tone polite.", "ai-basic-words"],
  ["ai-basic-words", "AI Basic Words", "AI has many strange words, but most of them become simple when you imagine AI as a busy helper working in a big kitchen.", [["Large model", "A large model is like a chef who has tasted millions of dishes, so when you ask for a new meal, it can guess a good recipe."], ["Token", "A token is like one small bite of language, and AI counts these bites when it reads your question and writes an answer."], ["Computing power", "Computing power is like the size of the kitchen and the strength of the stove: the bigger it is, the faster the AI can cook complicated work."], ["Prompt", "A prompt is your order to the AI waiter, so the clearer you order, the closer the dish comes to what you imagined."], ["Context", "Context is the conversation memory on the table, and AI uses it to remember what you already said instead of starting from zero."], ["Training", "Training is like sending the AI to cooking school for a very long time before it ever serves you."], ["Inference", "Inference is the moment the trained AI is actually cooking your answer after you place an order."], ["Hallucination", "A hallucination is like a confident waiter inventing a menu item that the kitchen does not really have, so important answers still need checking."], ["Model", "A model is one AI helper with its own habits, strengths, speed, and price."], ["API", "An API is like a service window where your app can order from AI without opening the normal chat page."]], "Explain these AI words like I am a beginner: large model, token, computing power, prompt, context, training, inference, hallucination, model, API.", "why-ai-costs-money"],
  ["why-ai-costs-money", "Why AI Costs Money", "Paying for AI is easier to understand when you imagine every answer as a small job done in a busy kitchen.", [["Token", "A token is one small bite of language, so a short answer is a snack and a long document is a full meal."], ["Model", "A model is the helper you choose, and stronger helpers usually cost more because they can handle harder jobs."], ["Computing power", "Computing power is the stove, electricity, and kitchen team working behind the answer."], ["API", "An API is the service window ARABAI can use to order work from AI tools in the background."], ["Image and video cost", "Images and videos cost more because AI is not only writing words; it is building pictures, movement, lighting, and details."], ["Credits", "Credits are a simpler wallet name for all these small costs, so normal users do not need to count tokens."]], "Explain why AI costs money like I am a normal user. Use a restaurant or kitchen example and explain token, model, computing power, API, images, video, and credits.", "what-is-a-prompt"],
  ["what-is-a-prompt", "What Is A Prompt?", "A prompt is the way you turn a messy thought into a clear job for AI.", [["Start with your raw idea", "Do not worry about style at the beginning. First pour out the background, the goal, the audience, and any notes you already have."], ["Ask AI to repeat back what it understood", "Before asking for the final result, let AI restate your idea in simple words. That way you can see whether it understood the real task."], ["Let AI clean up the order", "After the idea is clear, ask AI to turn the rough notes into a prompt with the job, audience, tone, and format."], ["Test before you trust it", "Ask for one sample result first. If it is close, keep going. If not, tell AI exactly what to keep, change, or remove."]], "I have a messy idea for a new product launch. Help me turn my rough notes into one clean prompt. First repeat back what you understood, then organize my notes into a simple brief I can use with AI.", "organize-prompt-first"],
  ["organize-prompt-first", "Let GPT Organize Your Idea First", "You do not need to write a perfect prompt at the beginning; you can ask GPT to help clean your messy idea before the real work starts.", [["Pour everything onto the table", "Tell GPT your rough idea, goal, audience, examples you like, details you remember, and even what you are unsure about."], ["Do not ask for the final answer yet", "First say: do not create the final content yet; repeat what you understood and tell me what is missing."], ["Let GPT make the working prompt", "After GPT understands you, ask it to turn the messy notes into a clear prompt that another AI tool can use for writing, slides, images, or video."], ["Test with one small sample", "Before using the prompt for a big job, ask GPT to show one sample result. If the sample feels wrong, fix the prompt with normal words."]], "I have a rough idea but I cannot explain it well yet. Please do not create the final content. First repeat what you understood. Then ask me what information is missing. After that, turn my messy notes into a clean prompt I can copy into ChatGPT, Gemini, Claude, Gamma, image-2, or a video AI tool.", "what-can-ai-do"],
  ["what-can-ai-do", "What Can AI Do?", "Picture AI as an assistant you take from room to room, and in each room it finds a different way to help.", [["In the office", "AI is like an office helper who can draft emails, prepare reports, clean up notes, explain spreadsheets, and turn a rough idea into a clear document."], ["In the design room", "AI is like a fast sketch partner who can turn your words into poster ideas, product images, ad concepts, and social media visuals."], ["In the audio room", "AI is like a small music helper who can suggest lyrics, jingles, background music ideas, and audio styles."]], "Act like my work assistant. I run a small shop and need three short Instagram captions for a new product.", "common-ai-tools"],
  ["common-ai-tools", "Common AI Tools", "Imagine walking into an AI tool market where every helper has a different personality, a different speed, and a different job.", [["For daily questions", "Doubao is like a friendly front desk helper for common questions, quick writing, explanations, and daily work."], ["For slides and documents", "Gamma is like a presentation designer who can turn your topic into a real deck with layout, sections, and visual structure."], ["For images, video, and music", "image-2, Seedance, Lyria, and GPT Audio Mini are like a design studio, video studio, and music room."]], "I need AI for common questions, writing, PPT, images, video, music, and documents. Recommend one or two common tools for each task.", "how-to-start"],
  ["how-to-start", "How To Start Using AI", "Starting with AI is like walking into a new coffee shop: you do not need to know the whole menu before ordering your first drink.", [["Pick one door", "Choose one simple AI tool first, because trying five tools on the first day feels like opening five notebooks and writing in none of them."], ["Ask one real question", "Your first task should be something useful today, not a big test of what AI can do in the whole world."], ["Ask again", "Using AI is a conversation, so the first answer is often the first draft, not the final answer."]], "I am new to AI. Help me write my first useful prompt for improving an email to a customer.", "free-vs-paid"],
  ["free-vs-paid", "Free vs Paid AI", "Free AI is like a tasting spoon, while paid AI is like booking the same helper for the jobs you do every week.", [["What free plans are good for", "Free plans are enough for first questions, short writing, summaries, translation, and learning how AI fits your day."], ["What paid plans usually add", "Paid plans often give newer models, faster replies, file tools, higher limits, and sometimes stronger privacy controls."], ["When paying makes sense", "Pay when AI is already saving you real time every week, or when the free version keeps slowing down real work."], ["When free is still enough", "If you only use AI once in a while, or you are still testing what you like, stay free a little longer."]], "I use AI for emails, translation, and summaries twice a week. Should I stay on a free plan or pay?", "ai-tool-differences"],
  ["ai-tool-differences", "How AI Tools Are Different", "AI tools are like workers in one busy shop: one talks well, one reads long files well, one designs well, and one helps you build things faster.", [["General chat tools", "Tools like ChatGPT, Claude, Gemini, and Doubao are good first doors for writing, asking questions, planning, and translation."], ["Image and video tools", "Image and video tools are more like a design studio: they need scene, style, mood, and format before they can make something useful."], ["Slides and document tools", "Tools like Gamma help turn a topic into a deck, outline, or page faster than starting from a blank screen."], ["Pick by task, not by hype", "Do not start with the biggest name; start with the job in front of you and choose the tool that was built for that job."]], "I need to write posts, make images, and summarize documents. Help me choose the right type of AI.", "ai-safety"],
  ["ai-safety", "Things To Be Careful About", "AI is a helpful new assistant, but you still need to decide what it should see, what it should never see, and what must be checked by a human.", [["Protect private information", "Do not paste passwords, bank details, private IDs, customer files, or confidential company data unless you clearly trust how the tool handles it."], ["Check confident answers", "AI can sound calm and certain even when it is wrong, so important answers should be treated like a first draft, not the final truth."], ["Use official websites", "Fake AI websites copy familiar names and logos, so always log in, upload files, or pay through the official website."], ["Do not let AI decide everything", "AI can help with ideas, drafts, and summaries, but medical, legal, financial, and business-critical decisions still need human review."]], "Review this text before I send it to a customer. Check if anything sounds risky, unclear, or too strong.", "beginner-path"],
  ["beginner-path", "Beginner Path", "Learning AI is like learning a new road: start with one safe lane, drive short distances, and get comfortable before you go faster.", [["Step 1: open one account", "Choose one well-known AI tool first, create a free account, and resist the urge to open five tools on the same day."], ["Step 2: learn what to type", "Good results usually come from clear requests that say what you want, how long it should be, and who it is for."], ["Step 3: try five small tasks", "Use AI for one question, one email, one summary, one brainstorm, and one simple explanation so your hands learn by doing."], ["Step 4: learn the limits", "AI can still be wrong, outdated, or overconfident, so learning when to check it is part of learning how to use it."]], "Make me a 5-day beginner plan to learn AI by doing small real tasks at work.", "private-jet-local-ai"],
  ["private-jet-local-ai", "Do You Want Your Own Private Jet?", "Most people ride public AI trains, but some people dream of owning a private jet that waits in their own hangar.", [["The normal way is like taking a train", "When you use online AI, you are like a passenger taking a powerful train that someone else owns and operates."], ["Local AI is like owning your own private jet", "A local AI model runs on your own computer, ready to fly without entering a public station."], ["Why it is not for everyone", "A private jet sounds exciting, but it needs a strong machine, setup time, storage space, maintenance, and patience."]], "Explain local AI like I am a beginner. Tell me whether my computer is suitable and whether I should start with online AI first.", "write-with-ai"]
];

const advancedSpecs = [
  ["write-with-ai", "I Want To Write", "Writing with AI is like sitting with an editor who helps you say the same idea more clearly.", "Write a customer delay email", "A small shop owner needs to tell a customer that an order will be two days late, but does not want the message to sound cold or careless.", "Rewrite this customer message for WhatsApp. Make it clear, polite, warm, and not too long. Original message: Hi, your order is late. It will come after two days. Sorry.", "make-a-plan"],
  ["make-a-plan", "I Want To Make A Plan", "Making a plan with AI is like emptying a messy bag onto a table and asking someone to sort everything into boxes.", "Make a launch plan for a new coffee product", "A cafe in Riyadh wants to launch a new iced saffron latte next Friday and needs a simple plan for promotion, staff, supplies, and social media.", "Create a 7-day launch plan for a new iced saffron latte at a small cafe in Riyadh. Launch day is next Friday. Include daily tasks, supplies to prepare, staff actions, Instagram content, customer message, possible risks, and a simple checklist. Use easy English.", "make-slides"],
  ["make-slides", "I Want To Make Slides", "Making slides with AI is like asking a storyteller to turn your messy notes into a clear beginning, middle, and ending.", "Create a 6-slide presentation in Gamma", "A small coffee shop owner in Riyadh wants a weekend promotion plan. They do not need slide theory; they need to open Gamma, paste one clear request, review the outline, and get an editable deck.", "Create a 6-slide presentation in English for a small coffee shop owner in Riyadh. Topic: Weekend promotion plan using AI. Audience: ordinary shop owner with no marketing team. Style: clear, practical, friendly, modern. Slides: 1. Title, 2. The problem: quiet weekends, 3. The AI idea: smart weekend offers, 4. Target customers, 5. 7-day action plan, 6. Expected results and next step. Use simple English. Do not use technical language. Keep all slide text in English.", "spreadsheets"],
  ["spreadsheets", "I Want To Work With Spreadsheets", "Using AI for spreadsheets is like having a patient office colleague who explains the table instead of making you stare at it alone.", "Make a simple sales table from messy notes", "A perfume shop owner has four days of sales written as plain text and wants a clean table, total sales, average daily sales, and best-selling product.", "Turn these sales notes into a clean table. Then calculate total sales, average daily sales, and best-selling product: May 1 Oud Oil quantity 2 sales 600 SAR; May 2 Bakhoor quantity 3 sales 450 SAR; May 3 Oud Oil quantity 3 sales 900 SAR; May 4 Perfume Spray quantity 2 sales 350 SAR. Use easy English and show the formulas I can copy into Excel.", "create-images"],
  ["create-images", "I Want To Create Images", "Creating images with AI is like describing a scene to a designer who starts drawing before you finish your coffee.", "Create an Instagram poster with image-2", "A perfume shop in Riyadh wants a weekend oud sale poster for Instagram. The owner needs a real square poster with readable English text, not only a prompt idea.", "Create a square Instagram poster for a weekend oud perfume sale. Main headline: Weekend Oud Sale. Offer: Up to 30% OFF. Small text: Friday & Saturday Only. Button: Shop Now. Style: premium Saudi luxury, realistic oud perfume bottle, black and warm brown background, gold smoke, elegant Arabic-inspired detail, clear readable text.", "edit-images"],
  ["edit-images", "I Want To Edit Images", "Editing images with AI is like asking a quiet studio assistant to move the background, clean the table, and fix the lighting.", "Edit a product photo for an online shop", "A seller has a perfume bottle photo taken on a messy table and wants it to look clean enough for an online store without changing the product.", "Remove the messy background from this product photo and replace it with a clean white studio background for an online shop. Keep the product shape, colors, label, and shadow realistic. Improve brightness slightly. Do not change the product itself. Export in high quality PNG.", "make-videos"],
  ["make-videos", "I Want To Make Videos", "Making videos with AI is like making a small comic first: draw the key pictures, arrange them in order, then let them move.", "Make a 15-second product video from a 9-image storyboard", "A small business wants a Ramadan date gift box video. Instead of asking video AI to guess everything at once, the safer beginner method is: text to image, create a 9-grid storyboard, then stitch the 9 images into a short video.", "Create 9 vertical storyboard images for a 15-second Ramadan date gift box product video. Keep the same gift box, same warm premium style, and same gold lantern lighting in every image. Image 1: closed luxury gift box on table. Image 2: box slightly opening. Image 3: close-up of dates inside. Image 4: Arabic coffee beside the gift box. Image 5: hand placing gold ribbon. Image 6: family gift moment, no faces close-up. Image 7: product with caption Ramadan Gift Collection. Image 8: product with caption Perfect for Family and Friends. Image 9: final hero shot with caption Order Yours Today. Style: realistic, premium, warm, vertical 9:16, clean background, no strange text.", "make-music"],
  ["make-music", "I Want To Make Music", "Making music with AI is like humming an idea to a small studio and asking it to turn the mood into sound.", "Create background music for a short ad", "A perfume store needs soft background music for a 20-second product video. The music should support the ad, not steal attention from the product.", "Create 20 seconds of luxury background music for a premium oud perfume advertisement. No vocals. Use soft Arabic percussion, warm strings, light oud instrument, deep ambient bass, and cinematic atmosphere. Mood should feel elegant, rich, modern, and relaxing.", "translate"],
  ["translate", "I Want To Translate", "Translating with AI is like asking a bilingual assistant to carry your meaning across a bridge, not just move words one by one.", "Translate a customer delivery message into Arabic", "A shop owner wrote an English message for customers in Saudi Arabia and wants it to sound natural, friendly, and not like machine translation.", "Translate this customer message into natural Arabic for Saudi customers. Keep it friendly and simple: Hello, your order has been confirmed. Delivery will arrive tomorrow between 4 PM and 8 PM. Thank you for shopping with us. Also give me a simple English back-translation so I can check the meaning.", "summarize-documents"],
  ["summarize-documents", "I Want To Summarize Documents", "Summarizing with AI is like sending someone into a long document and asking them to come back with only what matters.", "Summarize a supplier proposal", "A business owner receives a supplier offer for gift boxes and wants price, delivery time, payment terms, risks, and next actions without reading the full document five times.", "Summarize this supplier proposal in simple English. Separate price, delivery time, payment terms, free items, action items, and risks. Proposal: We can provide 500 luxury gift boxes at 18 SAR each. Delivery takes 10 days after logo approval. Payment is 50% before production and 50% after delivery. We include one free logo sticker design. During peak season, delivery may be delayed by 2 days.", "learn-something"],
  ["learn-something", "I Want To Learn Something", "Learning with AI is like having a tutor who can explain the same idea with a story, an example, or a simple exercise.", "Learn VAT basics before a meeting", "A small business owner wants to understand VAT basics before talking to an accountant, without reading government-style language first.", "Teach me VAT basics like I am a small shop owner. Use one simple example with 100 SAR, explain what I should record, and quiz me with five easy questions. Do not use technical tax language.", "grow-business"],
  ["grow-business", "I Want To Grow My Business", "Using AI for business is like adding a small helper behind the counter who writes, researches, and answers faster than you can alone.", "Create product text and customer replies for a bakery", "A bakery wants to sell a new luxury date cake box online and needs product text, customer replies, and ad ideas that can be copied into WhatsApp or Instagram.", "I sell a Luxury Date Cake Box in Riyadh. Customers are families, office buyers, and Ramadan gift buyers. Help me write: 1. short product description, 2. WhatsApp reply when a customer asks if it is available, 3. three Instagram ad headlines, 4. one simple offer idea. Use easy English.", "social-content"],
  ["social-content", "I Want To Create Social Media Content", "Creating social content with AI is like having a calendar assistant who keeps handing you ideas when the page is empty.", "Make a 2-week Instagram plan for a salon", "A beauty salon wants to post regularly, but the owner needs a real calendar with caption ideas, image ideas, and simple actions the staff can actually do.", "Create a 2-week Instagram plan for a beauty salon in Riyadh. Include day, post idea, short caption, image or video idea, and what the staff should prepare. Make it realistic for a small team. Use easy English.", "choose-right-tool"],
  ["choose-right-tool", "I Want To Choose The Right Tool", "Choosing an AI tool is like choosing a vehicle: a bicycle, taxi, truck, and plane can all move you, but not for the same trip.", "Choose AI tools for a small marketing team", "A small team needs AI for writing posts, images, slides, summaries, short videos, and music, but they do not want ten subscriptions at once.", "We are a small marketing team. We need AI for writing posts, making images, making slides, summarizing documents, creating short videos, and making simple background music. Recommend one or two tools for each job. Explain in simple language when to use each tool and what to try first for free.", "login-pages"],
  ["ai-apps-and-coding-tools", "AI Apps And Coding Tools", "AI apps are like different rooms in a work building: one room writes, one designs, one makes slides, and one helps build software.", "Choose the right AI app before paying", "A small business owner hears names like Cursor, Claude Code, Codex, Antigravity, Cherry Studio, CC Switch, Hermes, and OpenClaw, but does not know which ones are useful for ordinary work and which ones are mainly for developers.", "I am a normal business owner, not a programmer. Explain these AI apps in simple language: Cursor, Claude Code, OpenAI Codex, Google Antigravity, Cherry Studio, CC Switch, Hermes, and OpenClaw. Put them in a table with: what it does, who should try it, whether beginners should use it now, and what to be careful about. Do not use programming jargon.", "login-pages"],
  ["login-pages", "AI Login Pages", "AI login pages are like front doors, and using the right door matters because fake doors can lead you to trouble.", "Safely open a new AI account", "A user finds an AI tool on Google and wants to sign up safely without landing on a fake website or paying too early.", "Make me a safe checklist for logging into a new AI website before I create an account or pay. Include how to check the website address, official links, free plan, payment page, cancellation, and warning signs.", "subscription-pages"],
  ["subscription-pages", "AI Subscription Pages", "An AI subscription is like choosing a gym membership: the best plan is not the biggest one, but the one you will actually use.", "Decide whether to pay for an AI plan", "A freelancer uses AI for client writing, translation, and slides several days a week and wants to know whether a paid plan is worth it.", "I use AI three days a week for client writing, translation, and slides. Should I pay for an AI plan? Make a simple decision checklist. Tell me when to stay free, when to try one paid month, and when to cancel.", "price-comparison"],
  ["price-comparison", "Price Comparison", "Comparing AI prices is like comparing phone plans: the cheapest one is not always best if it runs out when you need it.", "Compare AI prices before choosing a tool", "A small business owner is comparing tools for writing, images, slides, and video and wants a simple table before subscribing.", "Compare these AI tools for a small business: ChatGPT, Claude, Gemini, Gamma, image-2, Runway or Kling, and a music AI tool. Make a simple table with main job, free option, paid option, limits to check, and recommendation. Do not invent exact prices if you are not sure; tell me what to verify on the official pricing page.", "what-is-api"]
];

const toolAdvanced = [
  ["chatgpt-advanced", "ChatGPT For Daily Work", "ChatGPT is like a general office assistant who can help with writing, planning, summaries, images, and everyday questions.", "Use ChatGPT to finish a client reply", "A user received a difficult client message and wants a clear reply.", "A client says our price is too high. Help me write a polite reply.", "chatgpt-expert"],
  ["doubao-advanced", "Doubao For Daily Questions", "Doubao is like a daily helper that answers common questions, rewrites simple text, explains things, and helps ordinary users start quickly.", "Use Doubao to answer a normal work question", "A user wants to ask a simple business question and receive an answer that is easy to understand.", "I run a small shop. Help me write a simple answer to a customer asking why delivery takes two days.", "doubao-expert"],
  ["gemini-advanced", "Gemini For Daily Work", "Gemini is like a fast assistant that is comfortable with search-style questions, documents, images, and Google-style work.", "Use Gemini to understand a screenshot", "A user has a confusing dashboard screenshot and wants to understand it.", "Explain this dashboard screenshot like I am not a data expert.", "gemini-expert"],
  ["claude-advanced", "Claude For Daily Work", "Claude is like a careful reader and writer who is good with long text, thoughtful answers, and clean writing.", "Use Claude to polish a long proposal", "A consultant has a rough proposal and wants it to sound professional.", "Rewrite this proposal for a business client. Make it clearer and easier to read.", "claude-expert"],
  ["deepseek-advanced", "DeepSeek For Daily Work", "DeepSeek is like a sharp thinking assistant for practical writing, reasoning, and problem solving.", "Use DeepSeek to compare two business choices", "A shop owner is choosing between a new branch and online delivery.", "Compare these two choices. Give pros, cons, risks, and a simple recommendation.", "deepseek-expert"],
  ["kimi-advanced", "Kimi For Daily Work", "Kimi is like a document assistant who is useful when you have long text, files, notes, or Chinese-language work.", "Use Kimi to read a long document", "A user has a long Chinese document and wants key points and tasks.", "Read this document and give key points, action items, deadlines, and risks.", "kimi-expert"],
  ["image-tools-advanced", "Image AI Tools For Daily Work", "Image AI tools are like designers who need you to describe the picture before they start drawing.", "Use image AI for a product poster", "A user wants to promote a skincare product with a clean poster.", "Create an image prompt for a skincare product poster.", "image-tools-expert"],
  ["video-tools-advanced", "Video AI Tools For Daily Work", "Video AI tools are like a small film crew that works better when you give it a clear scene list.", "Use video AI for a cafe reel", "A cafe wants a short reel showing a new drink being prepared.", "Create a 12-second cafe reel idea for a new iced latte.", "video-tools-expert"],
  ["music-tools-advanced", "Music AI Tools For Daily Work", "Music AI tools are like a small studio that turns mood, style, and purpose into sound.", "Use music AI for a podcast intro", "A creator wants a short intro sound for a business podcast.", "Create 8 seconds of intro music for a business podcast.", "music-tools-expert"]
];

const expertArticles = [
  ["what-is-api", "What Is An API?", "An API is like the service window behind a restaurant: ARABAI can send a user's order to AI in the background, then bring the finished answer back to the page.", "official-api-platforms"],
  ["official-api-platforms", "Official API Platforms", "Official API platforms are the kitchens where AI ability is produced; a site like ARABAI can later buy from these kitchens and turn the result into simple user tasks.", "api-price-comparison"],
  ["api-price-comparison", "API Price Comparison", "API pricing is like a meter running behind the curtain: short text is a short ride, while images, video, and music are longer and heavier trips.", "ai-gateway"],
  ["ai-gateway", "What Is An AI Gateway?", "An AI Gateway is like one control desk or train station for many AI routes: one entrance for you, many model choices behind it.", "gateway-platforms"],
  ["gateway-platforms", "Common AI Gateway Platforms", "Gateway platforms are different stations with different model lists, billing rules, logs, and backup value, so ARABAI must compare them carefully before relying on them.", "gateway-risks"],
  ["gateway-risks", "AI Gateway Risks", "A gateway can make AI easier to sell and easier to use, but it also becomes a business bridge that needs privacy, billing, and backup checks.", "multi-model-management"],
  ["multi-model-management", "Multi-Model Management", "Managing many AI models is like managing a team of specialists instead of forcing one person to do every job.", "ai-automation"],
  ["ai-automation", "AI Automation", "AI automation is like hiring a careful office runner who watches one repeat job and does the same steps for you every time.", "ai-for-teams"],
  ["ai-for-teams", "AI For Teams", "Using AI in a team is like putting a shared assistant in the office, so everyone needs rules for how to ask and what not to share.", "ai-for-business"],
  ["ai-for-business", "AI For Business", "Bringing AI into a business is like hiring a powerful new department, so you need jobs, rules, budgets, and supervision.", "what-is-ai"]
];

const expertToolArticles = [
  ["chatgpt-expert", "ChatGPT For Expert Use"],
  ["gemini-expert", "Gemini For Expert Use"],
  ["claude-expert", "Claude For Expert Use"],
  ["deepseek-expert", "DeepSeek For Expert Use"],
  ["kimi-expert", "Kimi For Expert Use"],
  ["doubao-expert", "Doubao For Expert Use"],
  ["image-tools-expert", "Image AI Tools For Expert Use"],
  ["video-tools-expert", "Video AI Tools For Expert Use"],
  ["music-tools-expert", "Music AI Tools For Expert Use"]
];

function advancedArticle([id, title, intro, caseTitle, scenario, prompt, next]) {
  const realScreensById = {
    "write-with-ai": [
      { title: "Step 1: Open your AI chat tool", text: "Use ChatGPT, Claude, Gemini, Doubao, or another official chat tool. Start a new chat so the answer is not mixed with an old task." },
      { title: "Step 2: Paste the customer message and the prompt", text: "Ask the AI to rewrite the message for WhatsApp, with a warm and polite tone, and tell it the message should stay short." },
      { title: "Step 3: Ask for one revision", text: "If the reply feels cold, ask: make it warmer and shorter. If it is too long, ask: keep only the important sentence." }
    ],
    "make-a-plan": [
      { title: "Step 1: Open your AI chat tool", text: "Start a new chat and tell the AI the product, launch date, city, team size, and what kind of plan you need." },
      { title: "Step 2: Ask for a 7-day checklist", text: "Use the prompt below and ask for daily tasks, supplies, staff actions, Instagram content, risks, and a simple checklist." },
      { title: "Step 3: Make it easier to follow", text: "After the first answer, ask: turn this into a short checklist I can follow day by day." },
      { title: "Step 4: Copy it into your notes", text: "Keep only tasks you can really do this week, then add real prices, staff names, and dates." }
    ],
    "make-slides": [
      { title: "Step 1: Open Gamma", text: "Go to the official Gamma website, choose Presentation, and start from a prompt instead of a blank page." },
      { title: "Step 2: Set the deck size", text: "Choose about 6 cards or slides for a beginner case. A short deck is easier to check and edit." },
      { title: "Step 3: Paste the prompt", text: "Use the prompt below. Keep the language English if your final website or client deck should be English." },
      { title: "Step 4: Review the outline", text: "Before generating, check that the six slide titles match the story: title, problem, AI idea, target customers, action plan, expected result." },
      { title: "Step 5: Export safely", text: "After editing, use Gamma export or share options to download PDF, PowerPoint, Google Slides, or a share link." }
    ],
    "spreadsheets": [
      { title: "Step 1: Prepare the messy notes", text: "May 1 Oud Oil quantity 2 sales 600 SAR\nMay 2 Bakhoor quantity 3 sales 450 SAR\nMay 3 Oud Oil quantity 3 sales 900 SAR\nMay 4 Perfume Spray quantity 2 sales 350 SAR" },
      { title: "Step 2: Ask AI to turn notes into a table and formulas", text: "Turn these sales notes into a clean table. Then calculate total sales, average daily sales, and best-selling product. Also show the Excel formulas I can copy." },
      { title: "Step 3: Copy the result into Excel or Google Sheets", text: "After AI gives the table, copy the rows into a spreadsheet. Check the total with =SUM(D2:D5), then save the file as your sales report." }
    ],
    "create-images": [
      { title: "Step 1: Prepare the exact poster words before opening image-2", text: "Main headline: Weekend Oud Sale\nOffer: Up to 30% OFF\nSmall text: Friday & Saturday Only\nButton: Shop Now" },
      { title: "Step 2: Copy the full image prompt into image-2", text: "Create a premium English poster for a weekend oud perfume discount campaign for a small perfume shop in Riyadh. Include exactly: Weekend Oud Sale, Up to 30% OFF, Friday & Saturday Only, Shop Now. Make it a square Instagram poster with a realistic oud perfume bottle, black and warm brown background, gold smoke, and elegant Saudi luxury mood." },
      { title: "Step 3: Check the finished poster on a phone-sized screen", image: "assets/outputs/oud-weekend-sale-poster-real.png" }
    ],
    "edit-images": [
      { title: "Step 1: Upload the product photo", text: "Use the product photo you want to sell with. The example below starts with a perfume bottle on a messy table." },
      { title: "Step 2: Tell the image tool what must not change", text: "Keep the product shape, colors, label, cap, bottle size, and shadow realistic. Only clean the background and lighting." },
      { title: "Step 3: Compare before and after", text: "If the bottle label changes, the cap becomes strange, or the product color changes, reject it and regenerate with: Keep the product exactly the same." }
    ],
    "make-videos": [
      { title: "Step 1: Use text-to-image first", text: "Do not start with video. First ask image-2 or another image AI to create 9 vertical images for the product story. This gives you control before anything moves." },
      { title: "Step 2: Make a 9-grid storyboard", text: "Image 1: closed gift box\nImage 2: box opening\nImage 3: dates close-up\nImage 4: Arabic coffee beside product\nImage 5: gold ribbon\nImage 6: gift moment\nImage 7: caption: Ramadan Gift Collection\nImage 8: caption: Perfect for Family and Friends\nImage 9: final caption: Order Yours Today" },
      { title: "Step 3: Keep the same product in every image", text: "Ask the image tool to keep the same gift box, same color, same light, and same background. If one image looks like a different product, regenerate only that image." },
      { title: "Step 4: Stitch the 9 images into a video", text: "Open CapCut, Canva, 剪映, or another editor. Put the 9 images in order. Give each image about 1.5 to 2 seconds. Add soft zoom, simple transitions, captions, and background music." },
      { title: "Step 5: Export and check the final video", text: "Watch the video on your phone. The product should stay clear, the order should make sense, the text should be readable, and the final frame should tell the viewer what to do." }
    ],
    "make-music": [
      { title: "Step 1: Decide where the music will be used", text: "Use case: 20-second oud perfume product video\nMood: luxury, warm, modern\nVoice: no vocals\nMain instruments: soft Arabic percussion, strings, light oud" },
      { title: "Step 2: Paste the music prompt into a music AI tool", text: "Create 20 seconds of luxury background music for a premium oud perfume advertisement. No vocals. Use soft Arabic percussion, warm strings, light oud instrument, deep ambient bass, and cinematic atmosphere." },
      { title: "Step 3: Test the music under the video", text: "Play the product video and music together. If the music is too loud, too busy, or feels like a full song, ask for a simpler background version." }
    ],
    "translate": [
      { title: "Step 1: Paste the exact customer message", text: "Hello, your order has been confirmed. Delivery will arrive tomorrow between 4 PM and 8 PM. Thank you for shopping with us." },
      { title: "Step 2: Ask for natural Arabic and back-translation", text: "Translate this into natural Arabic for Saudi customers. Then give me a simple English back-translation so I can check the meaning." },
      { title: "Step 3: Check names, time, and tone", text: "The AI can translate the language, but you still check customer name, delivery time, price, address, and whether the tone feels polite." }
    ],
    "summarize-documents": [
      { title: "Step 1: Paste the supplier proposal", text: "We can provide 500 luxury gift boxes at 18 SAR each. Delivery takes 10 days after logo approval. Payment is 50% before production and 50% after delivery. We include one free logo sticker design. During peak season, delivery may be delayed by 2 days." },
      { title: "Step 2: Ask AI to separate the useful parts", text: "Separate price, delivery time, payment terms, free items, action items, and risks. Use simple English." },
      { title: "Step 3: Turn the summary into actions", text: "Copy the action items into your work list: approve logo, confirm quantity, arrange payment, and ask about peak-season delay." }
    ],
    "learn-something": [
      { title: "Step 1: Tell AI your real level", text: "I am a small shop owner. I do not understand tax language. Explain VAT with one simple 100 SAR example." },
      { title: "Step 2: Ask for a quiz", text: "After the explanation, ask me five easy questions and correct my answers." },
      { title: "Step 3: Use AI like a tutor", text: "If one answer is confusing, do not continue. Ask: explain that again with a shop example." }
    ],
    "grow-business": [
      { title: "Step 1: Give AI the product and customer", text: "Product: Luxury Date Cake Box\nLocation: Riyadh\nCustomers: families, office buyers, Ramadan gift buyers\nChannel: WhatsApp and Instagram" },
      { title: "Step 2: Ask for copy-ready results", text: "Write a short product description, one WhatsApp reply, three Instagram ad headlines, and one simple offer idea." },
      { title: "Step 3: Replace generic words with your real details", text: "Add your actual price, delivery area, order deadline, and shop name before publishing." }
    ],
    "social-content": [
      { title: "Step 1: Describe the business and team size", text: "Business: beauty salon in Riyadh\nTeam: small team\nPlatform: Instagram\nGoal: more bookings and trust" },
      { title: "Step 2: Ask for a realistic calendar", text: "Create a 2-week Instagram plan with day, post idea, short caption, image or video idea, and what the staff should prepare." },
      { title: "Step 3: Pick only what you can actually shoot", text: "Delete ideas that need expensive filming. Keep posts your team can make with a phone." }
    ],
    "choose-right-tool": [
      { title: "Step 1: List jobs, not tool names", text: "Writing posts\nMaking images\nMaking slides\nSummarizing documents\nCreating short videos\nMaking simple background music" },
      { title: "Step 2: Ask for one or two tools per job", text: "Recommend one or two tools for each job. Explain when to use each tool and what to try first for free." },
      { title: "Step 3: Choose a small tool set", text: "A normal team should start with one chat tool, one slide tool, one image tool, and one video tool, then add music only when needed." }
    ],
    "ai-apps-and-coding-tools": [
      { title: "Step 1: Sort tools by job before reading rankings", text: "Daily chat: ChatGPT, Claude, Gemini, Doubao, Kimi\nSlides: Gamma\nImages: image-2, Canva AI, Midjourney, Ideogram\nVideo: Seedance, Runway, Kling, Pika\nMusic: Suno, Udio\nCoding and website work: Cursor, Claude Code, Codex, Antigravity" },
      { title: "Step 2: Know which tools are not for complete beginners", text: "Cursor, Claude Code, Codex, Antigravity, CC Switch, and OpenClaw are powerful, but they make the most sense when someone is building or changing websites, apps, automation, or code projects." },
      { title: "Step 3: Use Cherry Studio as a model-workbench example", text: "Cherry Studio is closer to a control desk: it can connect different AI models in one desktop app, but users still need to understand accounts, model choices, and sometimes API keys." },
      { title: "Step 4: Keep a research note before recommending a tool", text: "For every tool, check official website, pricing page, country access, beginner tutorial, safety notes, and last checked date before adding it to ARABAI." }
    ],
    "login-pages": [
      { title: "Step 1: Find the official website", text: "Search the tool name plus official website. Check the domain spelling before entering your email." },
      { title: "Step 2: Start free if possible", text: "If the site asks for a card before you understand the tool, stop and check whether there is a free plan or official pricing page." },
      { title: "Step 3: Save the real login page", text: "After you confirm the correct website, bookmark it. Next time, open the bookmark instead of clicking ads." }
    ],
    "subscription-pages": [
      { title: "Step 1: Write what AI did for you this week", text: "Example: wrote 5 client messages, translated 3 replies, made 1 Gamma deck, created 2 poster ideas." },
      { title: "Step 2: Compare cost with saved time", text: "If the tool saves several hours every month and the free plan blocks your work, test one paid month." },
      { title: "Step 3: Use the cancel test", text: "Before paying, find the cancel button or help page. If canceling is unclear, be careful." }
    ],
    "price-comparison": [
      { title: "Step 1: Compare by job first", text: "Do not compare every feature. Compare writing, images, slides, video, music, export, language support, and monthly cost." },
      { title: "Step 2: Verify prices on official pages", text: "AI prices change often. Use AI to build the table, but open each official pricing page before paying." },
      { title: "Step 3: Choose one month, not forever", text: "For a new tool, start monthly. Upgrade yearly only after you have used it for real work several times." }
    ],
    "chatgpt-advanced": [
      { title: "Step 1: Start with one real task", text: "Open ChatGPT and paste one customer reply, product idea, plan, or document summary task." },
      { title: "Step 2: Improve the first answer", text: "Ask for a warmer tone, shorter wording, a table, or a checklist until the result is ready to use." }
    ],
    "gemini-advanced": [
      { title: "Step 1: Use Gemini for explanation and Google-style work", text: "Open Gemini when you want help understanding a topic, drafting text, or working near Google documents and search-style questions." },
      { title: "Step 2: Ask for a practical answer", text: "Request a simple table, summary, checklist, or customer-ready message instead of a general explanation." }
    ],
    "claude-advanced": [
      { title: "Step 1: Use Claude for careful writing", text: "Open Claude when you want a long message, policy, explanation, document rewrite, or cleaner English tone." },
      { title: "Step 2: Ask for a copy-ready version", text: "Tell Claude who will read the text and ask it to produce the final version in the exact format you need." }
    ],
    "deepseek-advanced": [
      { title: "Step 1: Use DeepSeek for reasoning and comparison", text: "Open DeepSeek when you want to compare choices, understand logic, or break a problem into steps." },
      { title: "Step 2: Ask for pros, cons, risks, and recommendation", text: "A useful prompt is: compare these options, show pros and cons, risks, and tell me what a small business should do first." }
    ],
    "kimi-advanced": [
      { title: "Step 1: Use Kimi for long documents", text: "Open Kimi or another document-friendly AI when you have a long proposal, contract draft, article, or notes to summarize." },
      { title: "Step 2: Ask for action items", text: "Ask for key points, deadlines, money terms, risks, and the next three actions." }
    ],
    "image-tools-advanced": [
      { title: "Step 1: Write the picture before generating it", text: "Describe subject, style, background, colors, text, size, and what must stay readable." },
      { title: "Step 2: Generate and correct one thing at a time", text: "If the text is wrong, ask only to fix the text. If the product changed, ask to keep the product exactly the same." }
    ],
    "video-tools-advanced": [
      { title: "Step 1: Write the shot list first", text: "A video tool works better when you give one scene at a time: subject, action, camera movement, lighting, and length." },
      { title: "Step 2: Use images before motion", text: "For beginners, make key images first, arrange them into a 9-grid, then animate or stitch them into video." }
    ],
    "music-tools-advanced": [
      { title: "Step 1: Describe the mood and use", text: "Tell the music AI the length, mood, instruments, speed, and whether vocals are allowed." },
      { title: "Step 2: Test it with the real video", text: "Play the generated music under your video. If it distracts from the product, ask for a simpler background version." }
    ]
  };

  const realScreens = realScreensById[id] || [];
  const simulatedScreens = simulatedScreensFor(id, title, prompt, actionStepsFor(id), finalResultFor(id));

  return {
    section: "advanced",
    sectionLabel: "Use AI",
    backUrl: "advanced.html",
    title,
    intro,
    sections: [
      ["Start with a real task", "Do not ask AI to do something vague; give it a real job with a real audience and a clear result."],
      ["Give background", "AI works better when it knows who you are, who the work is for, and what style you want."],
      ["Ask for one improvement", "The first answer is only the first draft, so ask AI to make it shorter, warmer, clearer, or more useful."]
    ],
    caseStudy: {
      title: caseTitle,
      scenario,
      steps: actionStepsFor(id),
      screens: [...simulatedScreens, ...realScreens],
      output: outputFor(id),
      result: finalResultFor(id)
    },
    prompt,
    promptGuide: promptGuideFor(id, prompt),
    externalRefs: externalRefsFor(id),
    workflow: [
      "Open the AI tool.",
      "Paste or type your task.",
      "Add audience, tone, limits, and output format.",
      "Ask for a first version.",
      "Ask for changes and check the final result."
    ],
    next: [next, titleFor(next)]
  };
}

function outputFor(id) {
  const outputs = {
    "make-slides": {
      type: "deck",
      title: "Finished 6-slide Gamma deck plan",
      src: "assets/outputs/gamma-restaurant-proposal-deck.svg",
      alt: "Finished Gamma presentation deck preview"
    },
    "spreadsheets": {
      type: "table",
      title: "Finished spreadsheet example",
      columns: ["Date", "Product", "Quantity", "Sales Amount", "AI note"],
      rows: [
        ["May 1", "Oud Oil", "2", "600 SAR", "Strong day"],
        ["May 2", "Bakhoor", "3", "450 SAR", "Good volume"],
        ["May 3", "Oud Oil", "3", "900 SAR", "Best product"],
        ["May 4", "Perfume Spray", "2", "350 SAR", "Small add-on"]
      ],
      summary: ["Total sales: 2,300 SAR", "Average daily sales: 575 SAR", "Best-selling product: Oud Oil"]
    },
    "create-images": {
      type: "image",
      title: "Finished image-2 poster example",
      src: "assets/outputs/oud-weekend-sale-poster-real.png",
      alt: "Finished weekend oud sale poster"
    },
    "edit-images": {
      type: "beforeAfter",
      title: "Before and after product image",
      before: "assets/outputs/product-before.svg",
      after: "assets/outputs/product-after.svg",
      beforeLabel: "Before: messy table photo",
      afterLabel: "After: clean online shop image"
    },
    "make-videos": {
      type: "storyboardVideo",
      title: "Finished 9-grid storyboard and stitched video example",
      storyboard: "assets/outputs/ramadan-date-gift-9-grid.svg",
      video: "assets/outputs/ramadan-date-gift-video.mp4",
      captions: [
        "Step A: use text-to-image to make 9 key frames.",
        "Step B: check that the product looks consistent across all 9 frames.",
        "Step C: put the 9 images into a video editor in order.",
        "Step D: add slow zoom, captions, music, and export MP4.",
        "Use this MP4 as a structure sample, then replace it with your own export when you make a real campaign."
      ]
    },
    "make-music": {
      type: "audio",
      title: "Playable 20-second background music example",
      src: "assets/outputs/luxury-perfume-background-music.mp3",
      note: "Use this as a structure sample. For a real campaign, paste the prompt below into a music AI tool and export the track you choose."
    },
    "write-with-ai": {
      type: "table",
      title: "Finished writing result",
      columns: ["Version", "Text"],
      rows: [
        ["Original", "Hi, your order is late. It will come after two days. Sorry."],
        ["AI final", "Hi! Just a quick update - your order is running about 2 days late. So sorry about the delay, and thanks so much for your patience. We'll get it to you as soon as possible!"],
        ["Human check", "Confirm order number, delivery date, and whether you should offer a small apology coupon."]
      ],
      summary: ["The user finishes with one message that can be copied into WhatsApp."]
    },
    "make-a-plan": {
      type: "table",
      title: "Finished 7-day launch checklist",
      columns: ["Day", "Action"],
      rows: [
        ["Day 1", "Confirm drink name, price, ingredients, and target customer."],
        ["Day 2", "Prepare cups, milk, ice, syrup, lids, napkins, and backup supplies."],
        ["Day 3", "Train staff and write one customer sentence."],
        ["Day 4", "Shoot product photos and short pouring clips."],
        ["Day 5", "Post teaser and prepare launch caption."],
        ["Day 6", "Schedule launch post and check stock."],
        ["Day 7", "Launch, reply to customers, and record results."]
      ],
      summary: ["The user finishes with a plan that can be copied into Notes, Excel, or WhatsApp."]
    },
    "image-tools-advanced": {
      type: "image",
      title: "Example output from a clear image prompt",
      src: "assets/outputs/oud-weekend-sale-poster.svg",
      alt: "AI image prompt poster result"
    },
    "video-tools-advanced": {
      type: "video",
      title: "Example output from a shot list",
      src: "assets/outputs/ramadan-date-gift-video.mp4",
      captions: [
        "Give the video AI one scene at a time.",
        "Keep each scene short, clear, and visual.",
        "Add captions after the video is generated."
      ]
    },
    "doubao-advanced": {
      type: "table",
      title: "Finished Doubao answer structure",
      columns: ["Part", "What Doubao should give you"],
      rows: [
        ["Short answer", "A direct answer a normal customer can understand"],
        ["Reason", "One simple reason without technical words"],
        ["Message", "A copy-ready reply for WhatsApp or email"]
      ],
      summary: ["Use Doubao when the question is common, quick, and practical."]
    },
    "chatgpt-advanced": {
      type: "table",
      title: "Finished ChatGPT first-use checklist",
      columns: ["Step", "What the user learns"],
      rows: [
        ["Ask", "Type one real task, not a general question."],
        ["Improve", "Reply with one change: shorter, warmer, clearer, or more practical."],
        ["Use", "Copy the final result only after checking names, dates, and facts."]
      ],
      summary: ["ChatGPT is a good first tool for ordinary writing, planning, translation, summaries, and everyday work."]
    },
    "gemini-advanced": {
      type: "table",
      title: "Finished Gemini use map",
      columns: ["Best use", "Example"],
      rows: [
        ["Quick explanation", "Explain a screenshot, webpage, or topic in simple language."],
        ["Google-style work", "Turn rough notes into text for Docs, Gmail, or planning."],
        ["Check", "Verify links, facts, and current details before using the answer."]
      ],
      summary: ["Use Gemini when the job is close to search, explanation, or Google work."]
    },
    "claude-advanced": {
      type: "table",
      title: "Finished Claude use map",
      columns: ["Best use", "Example"],
      rows: [
        ["Long text", "Rewrite proposals, long emails, reports, and careful explanations."],
        ["Tone", "Make writing clearer, calmer, more natural, or more professional."],
        ["Review", "Ask Claude what is unclear or missing before sending the text."]
      ],
      summary: [
        "Use Claude when the work is mostly long writing or document understanding.",
        "Claude is usually discussed in three model names: Opus for the strongest work, Sonnet for the balanced everyday choice, and Haiku for the faster lighter choice.",
        "For beginners, the simple rule is: do not chase the name first; pick the model that fits the job and the budget."
      ]
    },
    "deepseek-advanced": {
      type: "table",
      title: "Finished DeepSeek use map",
      columns: ["Best use", "Example"],
      rows: [
        ["Compare choices", "List pros, cons, risks, and a recommendation."],
        ["Think through a problem", "Ask for options and tradeoffs in simple language."],
        ["Check", "Use another source for facts, prices, and current information."]
      ],
      summary: ["Use DeepSeek when you want practical reasoning, but still verify important facts."]
    },
    "kimi-advanced": {
      type: "table",
      title: "Finished Kimi use map",
      columns: ["Best use", "Example"],
      rows: [
        ["Long documents", "Summarize files, notes, meeting records, and long Chinese or mixed-language text."],
        ["Action extraction", "Ask for deadlines, risks, decisions, and next steps."],
        ["Check", "Open the original document again before making money or legal decisions."]
      ],
      summary: ["Use Kimi when the job starts with long material that needs to be read and organized."]
    },
    "translate": {
      type: "table",
      title: "Finished translation check",
      columns: ["Part", "Result"],
      rows: [
        ["Original English", "Hello, your order has been confirmed. Delivery will arrive tomorrow between 4 PM and 8 PM. Thank you for shopping with us."],
        ["Arabic result", "مرحباً، تم تأكيد طلبكم. سيصل التوصيل غداً بين الساعة 4 مساءً و8 مساءً. شكراً لتسوقكم معنا."],
        ["Back-translation", "Hello, your order has been confirmed. Delivery will arrive tomorrow between 4 PM and 8 PM. Thank you for shopping with us."],
        ["Final check", "Customer name, delivery time, address, and price still need human checking."]
      ],
      summary: ["Ask for back-translation when you cannot read the target language."]
    },
    "summarize-documents": {
      type: "table",
      title: "Finished supplier summary",
      columns: ["Question", "Answer from the proposal"],
      rows: [
        ["Price", "500 luxury gift boxes at 18 SAR each"],
        ["Delivery time", "10 days after logo approval"],
        ["Payment", "50% before production and 50% after delivery"],
        ["Free item", "One free logo sticker design"],
        ["Main risk", "Possible 2-day delay during peak season"],
        ["Next actions", "Confirm quantity, approve logo, arrange advance payment, ask about peak-season timing"]
      ],
      summary: ["Use this format when you need decisions, not a long summary."]
    },
    "learn-something": {
      type: "table",
      title: "Finished beginner lesson",
      columns: ["Part", "Simple answer"],
      rows: [
        ["VAT idea", "VAT is extra tax added on top of the product price."],
        ["100 SAR example", "If the product is 100 SAR and VAT is 15%, the customer pays 115 SAR."],
        ["What to record", "Product price, VAT amount, total paid, invoice, and date."],
        ["Quiz sample", "If the price is 200 SAR and VAT is 15%, what is the total?"],
        ["Answer", "230 SAR"]
      ],
      summary: ["Ask AI to teach, quiz, and correct you in the same chat."]
    },
    "grow-business": {
      type: "table",
      title: "Finished business copy pack",
      columns: ["Need", "Copy-ready result"],
      rows: [
        ["Product description", "Luxury Date Cake Box made with soft premium dates, rich cake layers, and elegant packaging. Perfect for gifts, Ramadan gatherings, and coffee time."],
        ["WhatsApp reply", "Thank you for your message. Yes, the Date Cake Box is available today. Delivery can be arranged within Riyadh. Please tell us the quantity you need."],
        ["Ad headline 1", "The Perfect Ramadan Dessert Gift"],
        ["Ad headline 2", "Fresh Date Cake Delivered Today"],
        ["Ad headline 3", "Luxury Date Cake Box for Family Gatherings"],
        ["Offer idea", "Order two boxes and get free delivery inside Riyadh this weekend."]
      ],
      summary: ["Replace example price, delivery area, and shop name before publishing."]
    },
    "social-content": {
      type: "table",
      title: "Finished 2-week salon content plan sample",
      columns: ["Day", "Post idea", "Caption", "Prepare"],
      rows: [
        ["Monday", "Hair transformation", "Fresh look, fresh confidence.", "Before and after photo"],
        ["Tuesday", "Nail art close-up", "Soft luxury nails this week.", "One clean hand photo"],
        ["Wednesday", "Staff spotlight", "Meet our beauty team.", "Short staff portrait"],
        ["Thursday", "Facial treatment", "Healthy skin starts here.", "Treatment room clip"],
        ["Friday", "Client review", "Thank you for trusting us.", "Screenshot review with permission"],
        ["Weekend", "Appointment reminder", "Weekend slots are open.", "Booking link and salon photo"]
      ],
      summary: ["Keep the plan realistic enough that staff can shoot it on a phone."]
    },
    "choose-right-tool": {
      type: "table",
      title: "Finished tool choice map",
      columns: ["Job", "Good first tool", "Why it fits"],
      rows: [
        ["Writing and replies", "ChatGPT, Claude, Doubao", "Good for everyday text and customer messages"],
        ["Slides", "Gamma", "Turns an outline into an editable deck"],
        ["Images", "image-2, Midjourney, Canva AI", "Good for posters, product visuals, and design ideas"],
        ["Short video", "Runway, Kling, Dreamina, SeeDance/Seedance access where available", "Good when you prepare scenes first"],
        ["Music", "Suno, Udio, Lyria access where available", "Good for short background tracks and jingles"],
        ["Long documents", "Claude, Kimi, ChatGPT", "Good for summaries and action lists"]
      ],
      summary: ["Start with one chat tool, one slide tool, and one creative tool."]
    },
    "ai-apps-and-coding-tools": {
      type: "table",
      title: "Finished AI app map",
      columns: ["Tool", "Plain meaning", "Who should try it first"],
      rows: [
        ["Cursor", "An AI code editor that helps write and change software projects", "Developers, website builders, and technical founders"],
        ["Claude Code", "A coding helper that works from the command line and can edit project files", "Developers or teams with technical setup help"],
        ["OpenAI Codex", "A coding agent that can read, edit, and build inside a project", "Developers and product teams"],
        ["Google Antigravity", "An agent-style AI development environment for building software with AI help", "Developers and advanced builders"],
        ["Cherry Studio", "A desktop workbench for using multiple AI models in one place", "Advanced users who want one control desk"],
        ["CC Switch", "A utility-style tool around Claude Code workflows; verify the exact source before recommending", "Experts only until the source is confirmed"],
        ["Hermes", "A name used by more than one AI project", "Research first; do not recommend until the exact product is clear"],
        ["OpenClaw", "Open-source or community coding-agent style tools need extra safety checking", "Experts who can check code and permissions"]
      ],
      summary: ["For ordinary users, coding tools are not the first stop. Start with chat, slides, images, video, and music; use coding tools when you want to build or change software."]
    },
    "login-pages": {
      type: "table",
      title: "Finished safe login checklist",
      columns: ["Check", "What to do"],
      rows: [
        ["Website address", "Check spelling and avoid ad links when possible"],
        ["Official source", "Use official website, app store link, or trusted company page"],
        ["Free plan", "Try free access before paying"],
        ["Payment page", "Read price, renewal, tax, and cancellation"],
        ["Warning sign", "Stop if the site asks for card details too early or looks copied"],
        ["After login", "Bookmark the correct page"]
      ],
      summary: ["Never enter passwords, cards, or API keys into a site you have not checked."]
    },
    "subscription-pages": {
      type: "table",
      title: "Finished payment decision table",
      columns: ["Situation", "Decision"],
      rows: [
        ["You are still learning", "Stay free"],
        ["You use it weekly but limits are annoying", "Try one paid month"],
        ["It saves several hours every month", "Paid plan may be worth it"],
        ["You only used it once this month", "Cancel or stay free"],
        ["You cannot find cancellation rules", "Do not pay yet"]
      ],
      summary: ["Pay for saved time, not for curiosity."]
    },
    "price-comparison": {
      type: "table",
      title: "Finished price comparison template",
      columns: ["Tool", "Main job", "What to verify before paying"],
      rows: [
        ["ChatGPT", "Writing, planning, summaries, image help", "Current plan price, message limits, image/video access"],
        ["Claude", "Long writing and document work", "Plan price, file limits, country access"],
        ["Gemini", "Google-style work, search, documents", "Plan bundle, storage, workspace access"],
        ["Gamma", "Slides and documents", "Export options, monthly credits, team sharing"],
        ["image-2 access", "Image generation", "Where you access it, generation limits, commercial usage rules"],
        ["Runway or Kling", "Short video", "Video credits, export watermark, resolution"],
        ["Music AI", "Background music or jingles", "Commercial usage, download quality, monthly song limits"]
      ],
      summary: ["AI pricing changes often, so open official pricing pages before subscribing."]
    },
    "music-tools-advanced": {
      type: "audio",
      title: "Example output from a music prompt",
      src: "assets/outputs/luxury-perfume-background-music.mp3",
      note: "Use this as a sample of what a finished background music result should feel like: short, simple, and made to sit behind a product video."
    }
  };

  return outputs[id] || null;
}

function finalResultFor(id) {
  const results = {
    "write-with-ai": "<p><strong>Final result from ChatGPT:</strong></p><p>Hi! Just a quick update - your order is running about 2 days late. So sorry about the delay, and thanks so much for your patience. We'll get it to you as soon as possible!</p>",
    "make-a-plan": "<p><strong>Final result from ChatGPT:</strong></p><ul><li>Day 1: Confirm recipe, product name, price, and preparation speed.</li><li>Day 2: Order coffee beans, milk, ice, cups, lids, syrup, straws, and napkins.</li><li>Day 3: Train staff and prepare one simple customer sentence.</li><li>Day 4: Take product photos and short pouring videos.</li><li>Day 5: Post a teaser: Something cold is coming. New iced coffee launches this Friday.</li><li>Day 6: Prepare backup supplies and schedule the launch post.</li><li>Day 7: Taste check, post the launch content, and ask customers to try the new drink.</li></ul>",
    "make-slides": "<p><strong>Final deck you are aiming for:</strong></p><ol><li><strong>Weekend Sales With AI</strong> - A simple plan for your Riyadh coffee shop.</li><li><strong>The problem: quiet weekends</strong> - Good coffee is not enough if nearby customers do not hear from you at the right time.</li><li><strong>The AI idea: smart weekend offers</strong> - Use AI to write offers, captions, and customer messages before Friday.</li><li><strong>Target customers</strong> - Nearby workers, families, students, weekend shoppers, and loyal customers.</li><li><strong>7-day action plan</strong> - Monday choose the offer, Tuesday make the poster, Wednesday write captions, Thursday prepare staff, Friday launch, Saturday reply to customers, Sunday check results.</li><li><strong>Expected result and next step</strong> - More weekend visits, clearer customer response, and one improved offer for next week.</li></ol><p><strong>Important:</strong> if Gamma gives you an outline that drifts away from your request, edit the outline before clicking generate. Treat Gamma like a designer: it is fast, but you still approve the brief.</p>",
    "spreadsheets": "<p><strong>Copy this into Doubao, ChatGPT, or another table-friendly AI:</strong></p><p>Turn these sales notes into a clean table. Then calculate total sales, average daily sales, and best-selling product: May 1 Oud Oil quantity 2 sales 600 SAR; May 2 Bakhoor quantity 3 sales 450 SAR; May 3 Oud Oil quantity 3 sales 900 SAR; May 4 Perfume Spray quantity 2 sales 350 SAR.</p><p><strong>What you should get:</strong> a table like the one above, plus the three summary answers. Then copy it into Excel or Google Sheets.</p>",
    "create-images": "<p><strong>Final result from image-2:</strong> a square Instagram poster with a realistic oud perfume bottle, gold luxury styling, readable English sale text, and a clear discount message.</p><p><strong>Check before posting:</strong> zoom out and read it like a customer on a phone. The headline, discount, date, and button must be easy to read. If the text is misspelled, ask image-2 to regenerate or fix only the typography.</p>",
    "edit-images": "<p><strong>Copy this into your image editing AI tool:</strong></p><p>Remove the messy background from this product photo and replace it with a clean white studio background for an online shop. Keep the product shape, colors, label, and shadow realistic. Improve brightness slightly. Do not change the product itself. Export in high quality PNG.</p><p><strong>What you should get:</strong> the same product, but clean enough to upload to an online store.</p>",
    "make-videos": "<p><strong>The normal beginner-friendly method:</strong></p><ol><li><strong>Text to image:</strong> use image-2 or another image AI to generate 9 vertical key frames.</li><li><strong>9-grid storyboard:</strong> arrange the 9 images in order and check whether the story is clear before making it move.</li><li><strong>Stitch into video:</strong> put the images into CapCut, Canva, 剪映, or another editor; add slow zoom, captions, music, and export MP4.</li></ol><p><strong>What you should get:</strong> a short product video that is easier to control than one-click text-to-video, because you can fix individual frames before stitching.</p><p><strong>Important:</strong> this is the simplest method for now. AI video tools keep improving, so new ways will appear later. In the current ARABAI examples, GPT helps with the prompt and script, and Seedance helps with the video generation part.</p>",
    "make-music": "<p><strong>Copy this into your music AI tool:</strong></p><p>Create 20 seconds of luxury background music for a premium oud perfume advertisement. No vocals. Use soft Arabic percussion, warm strings, light oud instrument, deep ambient bass, and cinematic atmosphere. Mood should feel elegant, rich, modern, and relaxing.</p><p><strong>What you should get:</strong> a short background track like the playable sample above, suitable for putting under a product video.</p>",
    "translate": "<p><strong>Final result from ChatGPT:</strong></p><p dir=\"rtl\" lang=\"ar\">مرحباً، تم تأكيد طلبكم.<br>سيصل التوصيل غداً بين الساعة 4 مساءً و8 مساءً.<br>شكراً لتسوقكم معنا.</p>",
    "summarize-documents": "<p><strong>Final result from ChatGPT:</strong></p><ul><li>500 gift boxes at 18 SAR each.</li><li>Delivery time: 10 days.</li><li>Payment: 50% upfront and 50% after delivery.</li><li>Free logo sticker included.</li><li>Action items: confirm quantity, approve logo, arrange advance payment.</li><li>Main risk: possible delay during peak season.</li></ul>",
    "learn-something": "<p><strong>Final result from ChatGPT:</strong></p><p>VAT is a tax added to products and services. If your product is 100 SAR and VAT is 15%, the customer pays 115 SAR. A business should add VAT to invoices, keep sales records, and submit VAT reports on time.</p><ul><li>Quiz: What does VAT stand for?</li><li>If a product costs 200 SAR, how much is 15% VAT?</li><li>Why should businesses keep invoices?</li><li>Who pays VAT to the government?</li><li>Is VAT added before or after the product price?</li></ul>",
    "grow-business": "<p><strong>Final result from ChatGPT:</strong></p><p><strong>Product description:</strong> Luxury Date Cake Box made with soft premium dates, rich cake layers, and elegant packaging. Perfect for gifts, Ramadan gatherings, and coffee time.</p><p><strong>Customer reply:</strong> Thank you for your message. Yes, the Date Cake Box is available today. Delivery can be arranged within the city. Please let us know your quantity.</p><ul><li>The Perfect Ramadan Dessert Gift.</li><li>Fresh Date Cake Delivered Today.</li><li>Luxury Date Cake Box for Family Gatherings.</li></ul>",
    "social-content": "<p><strong>Final result from ChatGPT:</strong></p><ul><li>Monday: Hair transformation. Caption: Fresh look, fresh confidence.</li><li>Tuesday: Nail art. Caption: Soft luxury nails this week.</li><li>Wednesday: Staff spotlight. Caption: Meet our beauty team.</li><li>Thursday: Facial treatment. Caption: Healthy skin starts here.</li><li>Friday: Client review. Caption: Thank you for trusting us.</li><li>Weekend: Beauty tips, salon interior, and appointment reminder posts.</li></ul>",
    "choose-right-tool": "<p><strong>Final result from ChatGPT:</strong></p><ul><li>Writing: ChatGPT or Claude.</li><li>Images: Canva AI or Midjourney.</li><li>Summaries: ChatGPT or Notion AI.</li><li>Short videos: CapCut or Canva AI.</li></ul>",
    "ai-apps-and-coding-tools": "<p><strong>Final result:</strong></p><p>AI apps are not all the same. Chat tools help you think and write, creative tools help you make media, and coding tools help someone build or change websites, apps, and automation. A normal user should not start with Claude Code, Codex, Cursor, or Antigravity unless the goal is software work or a technical person is helping.</p>",
    "login-pages": "<p><strong>Final result from ChatGPT:</strong></p><ul><li>Check website spelling carefully.</li><li>Make sure the site uses HTTPS.</li><li>Search for real reviews online.</li><li>Avoid logging in with public Wi-Fi.</li><li>Use a strong password.</li><li>Start with free plans first.</li><li>Check refund and cancellation policy.</li></ul>",
    "subscription-pages": "<p><strong>Final result from ChatGPT:</strong></p><ul><li>Will this tool save me time every week?</li><li>Can it help me earn more clients?</li><li>Is the free version enough?</li><li>Does it support my language and work type?</li><li>Can I cancel anytime?</li><li>Simple rule: if the tool saves more time than its monthly cost, it may be worth paying for.</li></ul>",
    "price-comparison": "<p><strong>Final result from ChatGPT:</strong></p><ul><li>Monthly price: Is it affordable long-term?</li><li>Free trial: Can I test before paying?</li><li>Team access: How many users are included?</li><li>Features: Does it include writing, images, or video?</li><li>Limits: Are there daily limits?</li><li>Export quality: Can I download high-quality files?</li><li>Cancellation: Can I stop anytime easily?</li></ul>"
    ,"chatgpt-advanced": "<p><strong>Final result:</strong></p><p>ChatGPT is a good first tool for everyday work: replies, writing, plans, summaries, tables, translation, and simple image prompts. A beginner can start by typing the real task, then asking for one improvement.</p>",
    "gemini-advanced": "<p><strong>Final result:</strong></p><p>Gemini is useful when the work feels close to search, Google-style documents, screenshots, or quick explanations. Use it when you want fast help understanding something and turning it into an answer.</p>",
    "claude-advanced": "<p><strong>Final result:</strong></p><p>Claude is useful when the job is long text: proposals, documents, careful rewriting, clearer tone, and thoughtful summaries. Give it the rough text, audience, and the style you want.</p>",
    "deepseek-advanced": "<p><strong>Final result:</strong></p><p>DeepSeek is useful when you want practical thinking: compare two choices, list pros and cons, find risks, and ask for a simple recommendation that a normal business owner can understand.</p>",
    "kimi-advanced": "<p><strong>Final result:</strong></p><p>Kimi is useful when you have long documents, Chinese-language material, notes, files, or meeting text. Ask it for key points, action items, deadlines, and risks.</p>",
    "image-tools-advanced": "<p><strong>Final result:</strong></p><p>Image AI tools work best when you bring a finished prompt: subject, style, colors, text, layout, and size. Do not just write 'make a poster'; describe the poster like you are talking to a designer.</p>",
    "video-tools-advanced": "<p><strong>Final result:</strong></p><p>Video AI tools work best when you prepare scene-by-scene instructions: what appears first, camera movement, caption, mood, and length. Treat the AI like a small film crew that needs a shot list.</p><p><strong>Simple note:</strong> GPT is used here for planning and prompting, while Seedance is one of the models that can help generate the video itself.</p>",
    "music-tools-advanced": "<p><strong>Final result:</strong></p><p>Music AI tools work best when you describe length, mood, instruments, speed, and whether vocals are allowed. For business videos, always say if you need background music only.</p>"
  };

  return results[id] || `<p><strong>Final result:</strong> The user gets a finished draft, plan, table, visual direction, or checklist that can be reviewed and used immediately.</p>`;
}

function basicArticle([id, title, intro, sections, prompt, next]) {
  const practice = beginnerPracticeFor(id, title, prompt);

  return {
    section: "beginner",
    sectionLabel: "AI Beginner",
    backUrl: "beginner.html",
    title,
    intro,
    sections,
    caseStudy: practice,
    workflow: practice.steps,
    prompt,
    promptGuide: promptGuideFor(id, prompt),
    externalRefs: externalRefsFor(id),
    next: [next, titleFor(next)]
  };
}

function expertArticle([id, title, intro, next]) {
  const practice = expertPracticeFor(id, title);
  const sectionsById = {
    "what-is-api": [
      ["What it means", "A normal chat page is like walking to the counter yourself, while an API lets your website send the order for the user and receive the result automatically."],
      ["Why it matters for ARABAI", "If ARABAI later has its own chat, image, video, music, or PPT buttons, the API is the pipe that carries the user's request to the right AI tool behind the page."],
      ["Two ways to use AI", "A normal user can open the official AI website directly, or later use ARABAI as one simple front desk that sends the task to the right AI through an API."],
      ["What users should understand", "Users do not need to see the API key or token details; they only need to know that every request uses real AI work in the background, and that work costs money."],
      ["Launch status", "ARABAI can explain the API route now, but real recharge, payment, account balance, and live AI generation should only open after backend, payment, privacy, and refund rules are ready."]
    ],
    "official-api-platforms": [
      ["What it means", "Official API platforms are the original counters run by companies such as OpenAI, Anthropic, Google, and other model providers."],
      ["Why it matters for ARABAI", "Buying from official platforms can give cleaner access, clearer rules, and stronger trust when ARABAI handles important user tasks."],
      ["Official purchase route", "If a user wants full control, they can go to the official provider, create an account, add billing, create an API key, set a spending limit, and use that provider directly."],
      ["ARABAI route", "If a user only wants to try small tasks, ARABAI can later hide the difficult setup and offer a simple credit wallet for approved AI tasks."],
      ["What users should understand", "The official platform is usually the safest source, but it may be harder for normal users, so ARABAI can translate that complexity into simple buttons and credits."]
    ],
    "api-price-comparison": [
      ["What it means", "API price is like a meter running behind the curtain: a short text job is a short ride, while image, video, and music jobs are longer and heavier rides."],
      ["What makes the bill grow", "More input, longer output, stronger models, bigger files, and creative media all push the meter higher."],
      ["Why it matters for ARABAI", "Before selling credits, ARABAI must know the cost of common jobs such as one chat answer, one image, one video clip, or one presentation draft."],
      ["Simple user promise", "Before a user spends credits, ARABAI should show the task type, likely credit range, and whether the task is light, medium, or heavy."],
      ["What users should understand", "Credits are not a mystery fee; they are a simple receipt for the AI work happening behind the screen."]
    ],
    "ai-gateway": [
      ["What it means", "A gateway is not one AI model; it is a station or control desk that lets one account reach many AI models without rebuilding the whole system every time."],
      ["Why businesses use it", "A gateway can hold routing, billing, logs, limits, and backup paths in one place instead of scattering them across many providers."],
      ["Why it matters for ARABAI", "A gateway can help ARABAI test many models quickly and offer users a single wallet instead of sending them to many different websites."],
      ["What users should understand", "The user sees one simple entrance, but ARABAI still needs to choose the right route for writing, image, video, music, or heavier work."]
    ],
    "gateway-platforms": [
      ["What it means", "Different gateway platforms are like different stations: some have more trains, some are cheaper, some are faster, and some have better logs and controls."],
      ["How to compare them", "Do not compare only by number of models. Compare billing clarity, logs, rate limits, privacy notes, uptime, and backup value too."],
      ["Why it matters for ARABAI", "ARABAI can connect to a gateway for speed and variety, but it should also keep official API options for important or sensitive tasks."],
      ["What users should understand", "A good platform is not only the one with the most models; it is the one that gives stable service, clear billing, and a reliable route when users pay for work."]
    ],
    "gateway-risks": [
      ["What it means", "A gateway is a useful bridge, but if the bridge closes, becomes expensive, or handles data badly, the business feels the pain."],
      ["Why it matters for ARABAI", "Because ARABAI may later sell credits, every provider risk can become a user trust problem: missing results, surprise cost, weak support, or privacy concern."],
      ["What users should understand", "A paid AI entrance should feel simple, but behind that simplicity ARABAI must check data rules, budget limits, backups, and refund logic."]
    ],
    "ai-automation": [
      ["What it means", "AI automation is not magic. It is one repeatable workflow where input goes in, AI does one job, a human reviews it, and the result moves forward."],
      ["Where to start", "Start with a small weekly task such as turning a customer form into a draft reply, or turning rough notes into a clean summary."],
      ["What keeps it safe", "The safe version uses test data first, clear stop rules, and a human approval step before anything reaches a real customer or real system."]
    ]
  };

  return {
    section: "expert",
    sectionLabel: "Deeper Guide",
    backUrl: "expert.html",
    title,
    intro,
    sections: sectionsById[id] || [
      ["What it means", `${title} is easier to understand when you treat it like part of a working system, not a magic word.`],
      ["When people use it", "People use it when normal chat is not enough and they need control, scale, privacy, automation, or team rules."],
      ["What to check", "Check cost, privacy, reliability, access, and who is responsible for reviewing the final result."]
    ],
    caseStudy: practice,
    workflow: practice.steps,
    prompt: practice.prompt,
    promptGuide: promptGuideFor(id, practice.prompt),
    externalRefs: externalRefsFor(id),
    next: [next, titleFor(next)]
  };
}

function externalRefsFor(id) {
  const refs = {
    "what-is-ai": [
      ["ChatGPT Learn: Getting started with ChatGPT", "https://chatgpt.com/", "Official starting point for a first ChatGPT session."],
      ["OpenAI Help: What is ChatGPT?", "https://help.openai.com/en/articles/12677804-what-is-chatgpt-faq", "Plain FAQ for everyday users."]
    ],
    "ai-basic-words": [
      ["ChatGPT Learn: AI fundamentals", "https://chatgpt.com/", "Good starting point for basic AI learning paths."],
      ["OpenAI Help: Prompting best practices", "https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices-for-chatgpt", "Useful for understanding prompts without going too deep."]
    ],
    "what-is-a-prompt": [
      ["OpenAI Docs: Prompting basics", "https://platform.openai.com/docs/guides/prompt-engineering", "A solid official guide to writing clearer prompts."],
      ["Google Help: Prompt tips for Gemini in Docs, Sheets, Slides, Vids & Forms", "https://support.google.com/docs/answer/15013615?hl=en", "Simple four-part prompt idea: persona, task, context, format."],
      ["YouTube: Learn Google Gemini Prompting in 5 Minutes", "https://www.youtube.com/watch?v=mRWY7vpZ0b4", "Short video with beginner-friendly prompt components and timestamps."]
    ],
    "organize-prompt-first": [
      ["Claude Docs: Prompt engineering overview", "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview", "Official Claude guidance: clear instructions, examples, and step-by-step prompt improvement."],
      ["Gemini Docs: Prompt design strategies", "https://ai.google.dev/gemini-api/docs/prompting-strategies", "Official Gemini guidance: give examples, break complex tasks into steps, and place the final question clearly."],
      ["Google Help: Prompt tips for Gemini in Docs, Sheets, Slides, Vids & Forms", "https://support.google.com/docs/answer/15013615?hl=en", "Simple four-part prompt idea: persona, task, context, format."]
    ],
    "what-can-ai-do": [
      ["ChatGPT Learn: Using ChatGPT", "https://chatgpt.com/", "A broad official map of what ChatGPT can do."],
      ["Gemini Apps Help", "https://support.google.com/gemini?hl=en", "Official Google help page showing common Gemini tasks."]
    ],
    "common-ai-tools": [
      ["ChatGPT sign up", "https://chatgpt.com/", "Start here for everyday writing, planning, translation, and summaries. Free access is useful for learning, but limits and available models can change."],
      ["Claude start page", "https://claude.ai/", "Good for longer writing and document-style work. Free access may have usage limits."],
      ["Gamma sign up", "https://gamma.app/signup", "Good for turning a topic into an editable presentation. Free features and export limits can change."],
      ["Midjourney", "https://www.midjourney.com/", "Image tool usually used through a paid subscription; check the current plan before starting."],
      ["Beginner prompt for first tool test", "https://chatgpt.com/", "Copy this first: I am new to AI. Help me choose one tool for writing, one for slides, one for images, and one for video. Explain the free starting point for each."]
    ],
    "how-to-start": [
      ["ChatGPT Learn: Getting started with ChatGPT", "https://chatgpt.com/", "Best official first-use walkthrough."],
      ["Claude Help: Get started with Claude", "https://support.claude.com/en/articles/8114491-get-started-with-claude", "Simple guide to access Claude and write a first prompt."]
    ],
    "free-vs-paid": [
      ["ChatGPT Pricing", "https://openai.com/chatgpt/pricing", "Official ChatGPT plan page."],
      ["Claude Pricing", "https://www.claude.com/pricing", "Official Claude plan page."],
      ["Google AI subscriptions", "https://gemini.google/subscriptions/", "Official Gemini/Google AI plan page."],
      ["Gamma pricing", "https://gamma.app/pricing", "Useful example of how a presentation tool splits free and paid features."]
    ],
    "ai-tool-differences": [
      ["ChatGPT Learn: Using ChatGPT", "https://chatgpt.com/", "Shows chat, files, search, image, and workflow categories."],
      ["Claude", "https://claude.ai/", "Good example of a writing and long-document AI tool."],
      ["Gamma Help Center", "https://help.gamma.app/", "Good example of a tool focused on presentations and documents."],
      ["Runway Academy: Prompting Guide", "https://academy.runwayml.com/image-to-video-guide", "Good example of a tool focused on visual/video work."]
    ],
    "ai-safety": [
      ["OpenAI Help: Data Controls FAQ", "https://help.openai.com/en/articles/7730893-chatgpt-privacy-practices", "Official guide for ChatGPT data controls."],
      ["OpenAI Help: File uploads FAQ", "https://help.openai.com/en/articles/8555545-uploading-images-and-files-in-chatgpt", "Useful before uploading documents or images."]
    ],
    "beginner-path": [
      ["ChatGPT Learn: Getting started with ChatGPT", "https://chatgpt.com/", "Good Day 1 starting point."],
      ["OpenAI Docs: Prompting basics", "https://platform.openai.com/docs/guides/prompt-engineering", "Good Day 2 prompt practice."],
      ["Google Gemini Help", "https://support.google.com/gemini?hl=en", "Another beginner-friendly starting point if Google tools feel more familiar."]
    ],
    "private-jet-local-ai": [
      ["Ollama", "https://ollama.com/", "Common beginner-friendly way to try local models."],
      ["LM Studio", "https://lmstudio.ai/", "Desktop app for trying local AI models without heavy coding."]
    ],
    "make-slides": [
      ["ARABAI video tutorial: Gamma full walkthrough", "ar-tutorials.html", "Local ARABAI video tutorial with Arabic subtitles for the full Gamma flow."],
      ["Gamma Help: Create a new presentation, document, or webpage", "https://help.gamma.app/de/articles/7838093", "Official Gamma step-by-step creation guide."],
      ["MakeUseOf: How to use Gamma AI to create presentations", "https://www.makeuseof.com/use-gamma-ai-to-create-presentations/", "Screenshot-style article that is easy for beginners."]
    ],
    "create-images": [
      ["ARABAI video tutorial: image-2 poster walkthrough", "ar-tutorials.html", "Local ARABAI video tutorial showing prompt writing and poster checking."],
      ["Canva: AI image generator", "https://www.canva.com/ai-image-generator/", "Beginner-friendly image generation tool page."],
      ["YouTube: Canva AI Image Generator Tutorial for Beginners", "https://www.youtube.com/watch?v=wTOHKRWapGI", "Step-by-step beginner video for image prompting."]
    ],
    "edit-images": [
      ["Canva Magic Studio", "https://www.canva.com/magic/", "Beginner-friendly image editing and design tools."],
      ["Adobe Express: Remove a background from a photo in one click", "https://www.adobe.com/learn/express/web/remove-background", "Official 1-minute beginner tutorial with clear steps."]
    ],
    "make-videos": [
      ["ARABAI video tutorial: 9-grid video workflow", "ar-tutorials.html", "Local ARABAI video tutorial for the text-to-image, storyboard, and stitching method."],
      ["Runway: Image to Video Prompting Guide", "https://help.runwayml.com/hc/en-us/articles/48324313115155", "Best reference for the rule: image controls look, prompt controls motion."],
      ["CapCut Photo Video Maker", "https://www.capcut.com/create/photo-video-maker/", "Official reference for turning images into a photo video."],
      ["Runway Academy: Prompting Guide", "https://academy.runwayml.com/image-to-video-guide", "Easy visual guide for text-to-video and image-to-video thinking."]
    ],
    "make-music": [
      ["Suno", "https://suno.com/", "Popular music generation tool for quick demos."],
      ["Udio", "https://www.udio.com/", "Popular music generation tool for songs and background ideas."]
    ],
    "spreadsheets": [
      ["OpenAI Docs: Data and file workflows", "https://platform.openai.com/docs/overview", "Official OpenAI docs entry point for file and data workflows."],
      ["OpenAI Help: Data analysis with ChatGPT", "https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt", "Official details about files, tables, and charts."]
    ],
    "translate": [
      ["Google Translate", "https://translate.google.com/", "Simple translation tool for quick checks."],
      ["DeepL Translator", "https://www.deepl.com/translator", "Useful second opinion for translation quality."],
      ["ChatGPT Learn: Working with files", "https://chatgpt.com/", "Useful when translating or checking uploaded documents."]
    ],
    "summarize-documents": [
      ["ChatGPT Learn: Working with files", "https://chatgpt.com/", "Official starting point for uploading, summarizing, and extracting action items."],
      ["OpenAI Help: File uploads FAQ", "https://help.openai.com/en/articles/8555545-uploading-images-and-files-in-chatgpt", "Official help page for supported files and upload behavior."]
    ],
    "learn-something": [
      ["ChatGPT Learn: Using ChatGPT", "https://chatgpt.com/", "Good source for learning workflows."],
      ["Gemini Apps Help: Learn in creative ways", "https://support.google.com/gemini?hl=en", "Official Gemini help area for learning tasks."]
    ],
    "grow-business": [
      ["ChatGPT Learn: ChatGPT for work", "https://chatgpt.com/", "Practical work examples for everyday business use."],
      ["Canva Magic Studio", "https://www.canva.com/magic/", "Useful for turning business copy into social visuals."]
    ],
    "social-content": [
      ["Canva Magic Studio", "https://www.canva.com/magic/", "Beginner-friendly design and social content tools."],
      ["CapCut Photo Video Maker", "https://www.capcut.com/create/photo-video-maker/", "Useful for turning product images into short social videos."]
    ],
    "choose-right-tool": [
      ["ChatGPT Learn: Using ChatGPT", "https://chatgpt.com/", "Good map of chat, files, images, and workflows."],
      ["Gamma Help Center", "https://help.gamma.app/", "Example of a presentation-focused AI tool."],
      ["Runway Academy", "https://academy.runwayml.com/image-to-video-guide", "Example of a video-focused AI tool."]
    ],
    "ai-apps-and-coding-tools": [
      ["Cursor", "https://cursor.com/", "Official Cursor website for the AI code editor."],
      ["Claude Code docs", "https://docs.anthropic.com/en/docs/claude-code/overview", "Official Anthropic documentation for Claude Code."],
      ["OpenAI Codex", "https://openai.com/codex/", "Official OpenAI Codex product page."],
      ["Google Antigravity", "https://antigravity.google/", "Official Google Antigravity website."],
      ["Cherry Studio", "https://www.cherry-ai.com/", "Official Cherry Studio website."],
      ["Product Hunt AI", "https://www.producthunt.com/categories/artificial-intelligence", "Useful discovery source for newly popular AI apps."]
    ],
    "login-pages": [
      ["ChatGPT", "https://chatgpt.com/", "Official ChatGPT login/start page."],
      ["Claude", "https://claude.ai/", "Official Claude login/start page."],
      ["Gemini", "https://gemini.google.com/", "Official Gemini login/start page."]
    ],
    "subscription-pages": [
      ["ChatGPT Pricing", "https://openai.com/chatgpt/pricing", "Official ChatGPT plan page."],
      ["Claude Help: Choosing a Claude plan", "https://support.claude.com/en/articles/11049762-choosing-a-claude-ai-plan", "Beginner-friendly official plan guide."],
      ["Google AI subscriptions", "https://gemini.google/subscriptions/", "Official Gemini/Google AI subscription page."]
    ],
    "price-comparison": [
      ["ChatGPT Pricing", "https://openai.com/chatgpt/pricing", "Verify current ChatGPT prices here."],
      ["Claude Pricing", "https://www.claude.com/pricing", "Verify current Claude prices here."],
      ["Google AI subscriptions", "https://gemini.google/subscriptions/", "Verify current Gemini prices here."]
    ],
    "chatgpt-advanced": [
      ["ChatGPT Learn: Getting started with ChatGPT", "https://chatgpt.com/", "Best official beginner walkthrough."],
      ["OpenAI Docs: Prompting basics", "https://platform.openai.com/docs/guides/prompt-engineering", "Simple prompt lesson for better answers."]
    ],
    "claude-advanced": [
      ["Claude Help: Get started with Claude", "https://support.claude.com/en/articles/8114491-get-started-with-claude", "Official beginner guide."],
      ["Claude video tutorial: Getting started with Claude.ai", "https://support.claude.com/en/articles/12997377-getting-started-with-claude-ai/", "Official embedded video tutorial for the Claude interface."]
    ],
    "gemini-advanced": [
      ["Gemini Apps Help", "https://support.google.com/gemini?hl=en", "Official Gemini help hub."],
      ["Gemini mobile app getting started", "https://support.google.com/gemini/answer/14554984?hl=en", "Official beginner setup guide."]
    ],
    "kimi-advanced": [
      ["Kimi Help: Getting Started", "https://www.kimi.com/help/getting-started", "Official Kimi beginner help area."]
    ],
    "doubao-advanced": [
      ["Doubao", "https://www.doubao.com/", "Official Doubao start page."],
      ["AIGC.cn Doubao tutorial", "https://www.aigc.cn/tutorial-on-how-to-use-doubao", "Chinese beginner tutorial with step-by-step examples."]
    ],
    "deepseek-advanced": [
      ["DeepSeek", "https://www.deepseek.com/", "Official DeepSeek website. Use this first because many DeepSeek tutorial pages in search results are unofficial."]
    ],
    "image-tools-advanced": [
      ["Canva: AI image generator", "https://www.canva.com/ai-image-generator/", "Easy image generation starting point."],
      ["YouTube: Canva AI Image Generator Tutorial for Beginners", "https://www.youtube.com/watch?v=wTOHKRWapGI", "Beginner video with prompt and style examples."]
    ],
    "video-tools-advanced": [
      ["Runway: Text to Video Prompting Guide", "https://help.runwayml.com/hc/en-us/articles/47313737321107-Text-to-Video-Prompting-Guide", "Official guide for direct text-to-video."],
      ["Runway: Image to Video Prompting Guide", "https://help.runwayml.com/hc/en-us/articles/48324313115155", "Official guide for image-to-video, better for controlled product videos."]
    ],
    "music-tools-advanced": [
      ["Suno", "https://suno.com/", "Popular beginner-facing music AI."],
      ["Udio", "https://www.udio.com/", "Popular music AI for songs and background ideas."]
    ],
    "what-is-api": [
      ["OpenAI API docs", "https://platform.openai.com/docs/overview", "Official OpenAI API starting point."],
      ["Claude API quickstart", "https://platform.claude.com/docs/en/get-started", "Official Claude API starting point."]
    ],
    "official-api-platforms": [
      ["ARABAI video tutorial: official API purchase flow", "ar-tutorials.html", "Local ARABAI guidance video for the official API route before live screen recording is finalized."],
      ["OpenAI Platform", "https://platform.openai.com/", "Official OpenAI API platform."],
      ["Anthropic Console", "https://console.anthropic.com/", "Official Claude API platform."],
      ["Google AI Studio", "https://aistudio.google.com/", "Official Gemini developer platform."]
    ],
    "api-price-comparison": [
      ["OpenAI API pricing", "https://openai.com/api/pricing/", "Verify current OpenAI API pricing."],
      ["Claude pricing", "https://www.claude.com/pricing", "Includes Claude API model pricing."],
      ["Gemini API pricing", "https://ai.google.dev/pricing", "Verify current Gemini API pricing."]
    ],
    "ai-gateway": [
      ["OpenRouter", "https://openrouter.ai/", "Common AI gateway for comparing and accessing many models."],
      ["OpenRouter Rankings", "https://openrouter.ai/rankings", "Useful market signal for popular models."],
      ["Cloudflare AI Gateway", "https://www.cloudflare.com/application-services/products/ai-gateway/", "Useful for logging, routing, and traffic control around AI calls."]
    ],
    "gateway-platforms": [
      ["OpenRouter", "https://openrouter.ai/", "Common gateway platform."],
      ["Portkey", "https://portkey.ai/", "Common gateway and observability platform for multi-model routing."],
      ["Together AI", "https://www.together.ai/", "Model hosting and API platform."],
      ["Replicate", "https://replicate.com/", "Common platform for image, video, and open model APIs."]
    ],
    "ai-automation": [
      ["Zapier AI", "https://zapier.com/ai", "No-code starting point for connecting apps and AI tasks."],
      ["Make", "https://www.make.com/en", "Visual workflow builder for beginners who want more control."],
      ["n8n", "https://n8n.io/", "Popular automation tool for users who want deeper workflows later."],
      ["YouTube: From LLM to Agent Skill", "https://www.youtube.com/watch?v=7qO8-kx3gW8", "Chinese expert-level video suggested by the owner. Useful for understanding LLM, token, context, prompt, tools, MCP, agent, and agent skill before we rewrite it in ARABAI's Arabic style."]
    ],
    "gateway-risks": [
      ["OpenAI Data Controls FAQ", "https://help.openai.com/en/articles/7730893-chatgpt-privacy-practices", "Use as a privacy checklist example."],
      ["OpenRouter Privacy Policy", "https://openrouter.ai/privacy", "Check gateway data handling before business use."]
    ]
  };

  const expertFallback = [
    ["OpenAI Platform docs", "https://platform.openai.com/docs/overview", "Official API and platform documentation."],
    ["Anthropic Claude docs", "https://docs.anthropic.com/", "Official Claude developer documentation."],
    ["Google AI Studio docs", "https://ai.google.dev/", "Official Gemini developer documentation."]
  ];

  return refs[id] || expertFallback;
}

function promptGuideFor(id, prompt) {
  const guides = {
    "what-is-a-prompt": [
      ["Step 1", "Dump your raw idea, background, and goal first."],
      ["Step 2", "Ask AI to repeat back what it understood."],
      ["Step 3", "Let AI clean the notes into a usable prompt."],
      ["Step 4", "Test one sample result before using the full prompt."],
      ["Step 5", "Ask for changes by saying what to keep, change, or remove."]
    ],
    "organize-prompt-first": [
      ["Raw idea", "Tell GPT the messy thought in your own words."],
      ["Stop rule", "Say: do not create the final answer yet."],
      ["Understanding check", "Ask GPT to repeat what it understood."],
      ["Missing details", "Ask what it still needs before writing."],
      ["Clean prompt", "Ask GPT to turn everything into one copy-ready prompt."]
    ],
    "why-ai-costs-money": [
      ["Token", "One small bite of language."],
      ["Model", "The helper you choose for the job."],
      ["Computing power", "The kitchen, stove, and electricity behind the work."],
      ["API", "The service window ARABAI can use in the background."],
      ["Credits", "A simple wallet word for all the small costs."]
    ],
    "write-with-ai": [
      ["Task", "Rewrite this customer message for WhatsApp."],
      ["Tone", "Clear, polite, warm, and not too long."],
      ["Material", "The original rough message is included."],
      ["Why it works", "AI is not guessing the situation; it is improving a real message."]
    ],
    "make-a-plan": [
      ["Background", "A small cafe in Riyadh is launching a new drink."],
      ["Task", "Create a 7-day launch plan."],
      ["Must include", "Tasks, supplies, staff actions, Instagram content, risks, and checklist."],
      ["Style", "Easy English, practical for a small team."]
    ],
    "make-slides": [
      ["Tool", "Gamma needs the full slide job, not only the topic."],
      ["Audience", "Ordinary shop owner with no marketing team."],
      ["Structure", "Six exact slides are listed before generation."],
      ["Language rule", "Keep all slide text in English."]
    ],
    "spreadsheets": [
      ["Material", "The messy sales notes are pasted directly."],
      ["Task", "Turn notes into a table and calculate answers."],
      ["Output", "Clean table, total sales, average, best-selling product, and formulas."],
      ["Check", "Money numbers must still be checked manually."]
    ],
    "create-images": [
      ["Format", "Square Instagram poster."],
      ["Subject", "Weekend oud perfume sale."],
      ["Exact text", "Headline, discount, date, and button are all listed."],
      ["Style", "Premium Saudi luxury, black, warm brown, gold smoke."]
    ],
    "edit-images": [
      ["Task", "Remove messy background and make a clean shop image."],
      ["Keep unchanged", "Product shape, colors, label, and realistic shadow."],
      ["Do not do", "Do not change the product itself."],
      ["Output", "High quality PNG."]
    ],
    "make-videos": [
      ["Method", "Start with text-to-image, not direct text-to-video."],
      ["Structure", "Nine vertical images become a simple 9-grid storyboard."],
      ["Consistency", "Keep the same product, lighting, color, and style in every image."],
      ["Final step", "Put the nine images into a video editor, add motion, captions, music, and export MP4."]
    ],
    "make-music": [
      ["Length", "20 seconds."],
      ["Use", "Background music for a perfume ad."],
      ["Mood", "Luxury, elegant, rich, modern, relaxing."],
      ["Limits", "No vocals, because it should sit behind the video."]
    ],
    "translate": [
      ["Task", "Translate a customer message into Arabic."],
      ["Audience", "Saudi customers."],
      ["Tone", "Friendly, natural, and simple."],
      ["Check", "Ask for English back-translation because you may not read Arabic."]
    ],
    "summarize-documents": [
      ["Material", "The supplier proposal text is pasted."],
      ["Task", "Summarize only what affects a decision."],
      ["Categories", "Price, delivery, payment, free items, actions, risks."],
      ["Style", "Simple English."]
    ],
    "learn-something": [
      ["Level", "Small shop owner, not tax expert."],
      ["Topic", "VAT basics."],
      ["Example", "Use 100 SAR so the idea is concrete."],
      ["Practice", "Ask for five easy quiz questions."]
    ],
    "grow-business": [
      ["Business", "Luxury Date Cake Box in Riyadh."],
      ["Customers", "Families, office buyers, Ramadan gift buyers."],
      ["Outputs", "Product description, WhatsApp reply, ad headlines, offer idea."],
      ["Style", "Easy English, ready to copy."]
    ],
    "social-content": [
      ["Business", "Beauty salon in Riyadh."],
      ["Platform", "Instagram."],
      ["Output", "Day, idea, caption, visual idea, staff preparation."],
      ["Reality check", "Small team, phone-friendly content."]
    ],
    "choose-right-tool": [
      ["Start point", "List jobs before listing tool names."],
      ["Jobs", "Writing, images, slides, summaries, video, music."],
      ["Output", "One or two tools per job."],
      ["Budget rule", "Explain what to try first for free."]
    ],
    "ai-apps-and-coding-tools": [
      ["Start point", "Sort by job, not by hype."],
      ["Normal-user tools", "Chat, slides, images, video, music, translation, and document tools."],
      ["Builder tools", "Cursor, Claude Code, Codex, Antigravity, CC Switch, and OpenClaw belong to software-building work."],
      ["Safety rule", "Check the official website and do not paste secrets, API keys, passwords, or private code into unknown tools."]
    ],
    "login-pages": [
      ["Task", "Make a safe login checklist."],
      ["Risk", "Fake websites and paying too early."],
      ["Checks", "Domain, official links, free plan, payment, cancellation."],
      ["Warning signs", "Tell the user when to stop."]
    ],
    "subscription-pages": [
      ["Use case", "AI used three days a week."],
      ["Tasks", "Client writing, translation, slides."],
      ["Decision", "Stay free, try paid month, or cancel."],
      ["Rule", "Pay only when it saves real time."]
    ],
    "price-comparison": [
      ["Task", "Make a simple price comparison table."],
      ["Tools", "ChatGPT, Claude, Gemini, Gamma, image-2, video, music."],
      ["Avoid guessing", "Do not invent exact prices if unsure."],
      ["Final check", "Verify on official pricing pages."]
    ]
  };

  if (guides[id]) return guides[id];

  return [
    ["Background", "Tell AI the real situation."],
    ["Task", "Say exactly what you want AI to make."],
    ["Style", "Say how the result should sound or look."],
    ["Output", "Say whether you want a list, table, message, image prompt, or plan."]
  ];
}

function actionStepsFor(id) {
  const steps = {
    "write-with-ai": [
      "Open ChatGPT, Claude, Gemini, or another writing AI.",
      "Paste your rough message and tell AI who will read it.",
      "Ask for one short version and one warmer version.",
      "Choose the version that sounds most like you.",
      "Read it once yourself before sending."
    ],
    "make-a-plan": [
      "Open a chat AI and write the real goal, date, budget, and people involved.",
      "Ask for a simple plan with days, tasks, owner, and risk.",
      "Remove tasks that do not fit your real situation.",
      "Ask AI to turn the plan into a checklist.",
      "Copy the checklist into Notes, Excel, Notion, or WhatsApp."
    ],
    "make-slides": [
      "Open Gamma and choose Generate.",
      "Choose Presentation, set the card count to 6, and set the language to English.",
      "Paste the full request, including audience, topic, slide list, style, and the words: Keep all slide text in English.",
      "Click generate outline and read the outline before making the deck.",
      "If one slide is wrong, edit that slide title or bullet first.",
      "Choose a clean business theme and keep AI images turned on if you want Gamma to add visuals.",
      "Generate the deck, then open each slide and replace any weak text with your real offer, price, dates, and shop name.",
      "Export the finished deck as PDF or PowerPoint before sending it to anyone."
    ],
    "spreadsheets": [
      "Prepare your numbers with clear column names.",
      "Paste a small sample into AI and say what answer you need.",
      "Ask AI to create the table, formulas, and summary.",
      "Copy the table into Excel or Google Sheets.",
      "Check the totals with a calculator before using it for money decisions."
    ],
    "create-images": [
      "Write the exact words that must appear on the poster.",
      "Open image-2 or the image AI tool where image-2 is available.",
      "Paste the full prompt with product, text, color, style, and square Instagram size.",
      "Generate the first poster.",
      "Check four things: spelling, product quality, layout, and whether the discount is easy to see.",
      "If the picture is good but the words are wrong, ask image-2 to fix only the text and layout.",
      "Download the final image and check it at phone size before posting."
    ],
    "edit-images": [
      "Open an image editing AI and upload the product photo.",
      "Tell it exactly what must stay unchanged.",
      "Ask for one clean background change first.",
      "Compare the before and after image.",
      "Download only when the product shape, label, and color still look correct."
    ],
    "make-videos": [
      "Write the product, selling point, audience, and final call to action.",
      "Open image-2 or another image AI and create 9 vertical images first.",
      "Keep the same product, lighting, color, and style across all 9 images.",
      "Arrange the 9 images into a storyboard and remove any weak frame.",
      "Open CapCut, Canva, 剪映, or another video editor.",
      "Place the 9 images in order and give each image about 1.5 to 2 seconds.",
      "Add slow zoom, simple transitions, captions, logo, and background music.",
      "Export MP4 and check it on a phone before posting."
    ],
    "make-music": [
      "Decide where the music will be used: ad, intro, video, or shop background.",
      "Write length, mood, instruments, and whether vocals are allowed.",
      "Copy the music prompt into a music AI tool.",
      "Listen once with the video or product page open.",
      "Export only if the music supports the content without stealing attention."
    ],
    "translate": [
      "Paste the original message into AI.",
      "Tell AI who will read it and which country it is for.",
      "Ask for a natural translation, not word-by-word translation.",
      "Ask AI to also explain any words that may sound too strong.",
      "Check names, dates, prices, and addresses before sending."
    ],
    "summarize-documents": [
      "Paste the text or upload the document.",
      "Ask for key points, deadlines, prices, risks, and action items.",
      "Ask AI to separate facts from suggestions.",
      "Copy the action list into your work notes.",
      "Open the original document again and check important numbers."
    ],
    "learn-something": [
      "Tell AI your current level and why you need to learn the topic.",
      "Ask for a simple explanation with one real example.",
      "Ask AI to quiz you with five questions.",
      "Answer the quiz and let AI correct you.",
      "Ask for the next lesson only after you understand the first one."
    ],
    "grow-business": [
      "Write your product, customer type, price, and sales channel.",
      "Ask AI for product text, customer replies, and three ad ideas.",
      "Choose one idea that matches your real customer.",
      "Ask AI to make it shorter for WhatsApp or Instagram.",
      "Post the result and save customer questions for the next AI task."
    ],
    "social-content": [
      "Write your business type, target customer, and posting platform.",
      "Ask AI for a two-week content calendar.",
      "Choose the posts you can actually make.",
      "Ask AI to write captions and image ideas for those posts.",
      "Put the posts into a calendar and prepare the first three."
    ],
    "choose-right-tool": [
      "List the jobs you want AI to help with.",
      "Mark each job as writing, image, video, music, document, or business.",
      "Ask AI to recommend one simple tool for each job.",
      "Start with the free version when possible.",
      "Pay only after the tool has saved you real time."
    ],
    "ai-apps-and-coding-tools": [
      "Write the job you want done before choosing a tool.",
      "If the job is writing, planning, translating, slides, images, video, or music, start with normal user tools.",
      "If the job is building a website, app, automation, or code project, look at coding tools such as Cursor, Claude Code, Codex, or Antigravity.",
      "Open the official website and pricing page before installing or paying.",
      "For coding tools, avoid private code, passwords, API keys, and customer data until you understand the tool."
    ],
    "login-pages": [
      "Search for the official website or use a trusted direct link.",
      "Check the spelling of the domain before logging in.",
      "Create the account with your own email.",
      "Start with free access if the tool allows it.",
      "Save the correct login page so you do not use a fake website later."
    ],
    "subscription-pages": [
      "Write down what you used AI for this week.",
      "Check whether the free plan blocked you.",
      "Compare monthly price with time saved.",
      "Choose monthly payment first if you are still testing.",
      "Cancel tools you do not use every week."
    ],
    "price-comparison": [
      "Choose three tools you are seriously considering.",
      "Write down monthly price, free limits, best use, and export quality.",
      "Ask AI to turn the information into a simple comparison table.",
      "Choose based on your real task, not the longest feature list.",
      "Review the choice again after one month."
    ]
  };

  return steps[id] || [
    "Open the AI tool that fits this job.",
    "Type the real task with background and goal.",
    "Ask for a first result.",
    "Ask for one useful improvement.",
    "Check the final result before using it."
  ];
}

function beginnerPracticeFor(id, title, prompt) {
  const cases = {
    "what-is-ai": {
      scenario: "You have never used AI before, so the first job is not to learn theory; it is to make AI write one useful message for you.",
      result: "<p><strong>What you should finish:</strong> one polite customer message that you can copy, edit, and send.</p>"
    },
    "what-can-ai-do": {
      scenario: "You will test AI like walking through five small rooms: writing, planning, table, image idea, and translation.",
      result: "<ul><li>One short caption.</li><li>One simple task plan.</li><li>One small table.</li><li>One poster idea.</li><li>One translated customer message.</li></ul>"
    },
    "ai-basic-words": {
      scenario: "You will learn the common AI words like learning the names of tools in a kitchen: not to become a chef, but so you know what people are talking about.",
      result: "<ul><li>Large model: the experienced chef.</li><li>Token: one small bite of language.</li><li>Computing power: the size and strength of the kitchen.</li><li>Prompt: your order to the waiter.</li><li>Context: the notes already on the table.</li><li>Training: the AI's long cooking school before it serves users.</li><li>Inference: the moment AI cooks your answer after you order.</li><li>Hallucination: a confident but wrong answer that still needs checking.</li><li>Model: one AI helper with its own habits and price.</li><li>API: the service window for apps and websites.</li></ul>"
    },
    "why-ai-costs-money": {
      scenario: "You will learn why one AI task may cost very little and another task may cost much more, without learning billing formulas.",
      result: "<ul><li>Short text is cheaper because it uses fewer language bites.</li><li>Long documents cost more because AI must read and write more.</li><li>Images cost more because AI must build a full picture.</li><li>Video costs more because AI must create many changing pictures.</li><li>Credits hide the technical counting so normal users can think by task.</li></ul>"
    },
    "organize-prompt-first": {
      scenario: "You have a rough idea for a product video, but the idea is still messy. Instead of forcing yourself to write a perfect prompt, you will let GPT help organize the brief first.",
      result: "<p><strong>What you should finish:</strong> one clean prompt that can be copied into a writing tool, image tool, slide tool, or video tool.</p><ul><li>A short summary of your idea.</li><li>A list of missing details.</li><li>One final copy-ready prompt.</li><li>One small sample result to check the direction.</li></ul>"
    },
    "common-ai-tools": {
      scenario: "You need to choose a first AI tool without getting lost in tool names.",
      result: "<p><strong>What you should finish:</strong> a short personal tool list: one chat tool, one image tool, one video tool, and one music tool.</p>"
    },
    "how-to-start": {
      scenario: "You will open one AI website, log in, and ask one real question instead of reading more introductions.",
      result: "<p><strong>What you should finish:</strong> your first AI answer, then a second improved version after you ask it to make the result clearer.</p>"
    },
    "free-vs-paid": {
      scenario: "You want to know whether a paid plan really helps, so you will compare one real weekly task against the limits of a free account.",
      result: "<p><strong>What you should finish:</strong> a clear decision: stay free, test one paid month, or wait until AI becomes part of weekly work.</p>"
    },
    "ai-tool-differences": {
      scenario: "You have different jobs in front of you, so you will match each job to the right kind of AI instead of forcing one tool to do everything.",
      result: "<p><strong>What you should finish:</strong> a personal task-to-tool map for chat, images, video, and slides.</p>"
    },
    "ai-safety": {
      scenario: "Before using AI for real work, you will clean one real task so private information stays out and risky claims get checked.",
      result: "<p><strong>What you should finish:</strong> a safer version of your task with names, IDs, passwords, and sensitive details removed or replaced.</p>"
    },
    "beginner-path": {
      scenario: "You will follow a five-day beginner route where each day produces one small result and teaches one basic AI habit.",
      result: "<ul><li>Day 1: one free AI account opened.</li><li>Day 2: one clear prompt written.</li><li>Day 3: one email, summary, and question tested.</li><li>Day 4: one image or slide task tried.</li><li>Day 5: one simple rule for when to trust AI and when to check it.</li></ul>"
    },
    "private-jet-local-ai": {
      scenario: "You will check whether local AI is worth trying before spending time installing anything.",
      result: "<p><strong>What you should finish:</strong> a yes/no decision: keep using online AI for now, or try a beginner local AI app on your own computer.</p>"
    }
  };

  const selected = cases[id] || {
    scenario: "You will use this article to finish one small real task, not just understand an idea.",
    result: "<p><strong>What you should finish:</strong> one small AI result you can actually use.</p>"
  };

  return {
    title: `Try it now: ${title}`,
    scenario: selected.scenario,
    steps: beginnerStepsFor(id),
    screens: simulatedScreensFor(id, title, prompt, beginnerStepsFor(id), selected.result),
    result: selected.result
  };
}

function beginnerStepsFor(id) {
  const steps = {
    "organize-prompt-first": [
      "Open ChatGPT, Gemini, Claude, or another chat AI.",
      "Paste your messy idea exactly as you would explain it to a friend.",
      "Add this sentence: do not create the final content yet; first repeat what you understood.",
      "Read the AI's understanding and correct anything wrong.",
      "Ask: what information is missing before you can write a strong prompt?",
      "Answer the missing questions in simple words.",
      "Ask AI to turn everything into one clean prompt you can copy into the tool you need."
    ],
    "common-ai-tools": [
      "Write the jobs you want help with: writing, image, video, translation, study, or business.",
      "Choose one main chat tool first, such as ChatGPT, Gemini, Claude, DeepSeek, or Kimi.",
      "Choose one creative tool only when you need images, video, or music.",
      "Open the official website or app.",
      "Try one free task before paying."
    ],
    "how-to-start": [
      "Open one AI chat tool.",
      "Log in with your email or app account.",
      "Copy the prompt below into the chat box.",
      "Read the first answer.",
      "Reply: make it shorter, clearer, and easier for a normal person."
    ],
    "free-vs-paid": [
      "Open the free version of one tool you already use, such as ChatGPT, Claude, or Gemini.",
      "Give it one real task you do every week.",
      "Notice speed, limits, file access, and whether the answer quality is enough.",
      "Write down what frustrated you and what was already good enough.",
      "Only then decide whether one paid month would save more time than it costs."
    ],
    "ai-tool-differences": [
      "Write down four jobs: chat, image, video, and slides or documents.",
      "Choose one tool type for each job instead of looking for one magic app.",
      "Test one small task in one tool only.",
      "Compare the result with what you actually needed, not with hype online.",
      "Keep the tools that feel easy and useful, and ignore the rest for now."
    ],
    "ai-safety": [
      "Look at your task before pasting it into AI.",
      "Remove passwords, ID numbers, bank details, and private customer information.",
      "Replace real names with simple labels like Customer A or Company B.",
      "Ask AI to help with the cleaned version.",
      "Check the final answer yourself before sending or publishing."
    ],
    "beginner-path": [
      "Day 1: open one free AI account and ask one simple question.",
      "Day 2: write one better prompt with task, audience, and style.",
      "Day 3: use AI for one email, one summary, and one explanation.",
      "Day 4: try one creative task like an image prompt or slide outline.",
      "Day 5: write down one rule for when you trust AI and one rule for when you double-check it."
    ],
    "private-jet-local-ai": [
      "Ask AI to explain local AI in beginner language.",
      "Check your computer memory, storage, and chip type.",
      "If your computer is not strong, stay with online AI.",
      "If you still want to try, start with a beginner local AI app and a small model.",
      "Use local AI for private drafts, but keep important results checked by a stronger online tool."
    ],
    "ai-basic-words": [
      "Read one word at a time.",
      "Do not try to memorize the technical definition.",
      "Connect each word to the kitchen story.",
      "When you see the word again, ask: is this about the chef, the order, the kitchen, or the memory on the table?",
      "Move on when the image makes sense, even if the technical details are still fuzzy."
    ],
    "why-ai-costs-money": [
      "Think of AI like a restaurant kitchen.",
      "Short text is like a small snack: quick and cheap.",
      "A long document is like a big meal: the kitchen works longer.",
      "An image is like asking the kitchen to prepare a decorated cake: more detail costs more.",
      "A video is like asking for many decorated cakes in a moving display: it needs much more work.",
      "Credits are the simple receipt name for all this work."
    ]
  };

  return steps[id] || [
    "Open a simple AI chat tool.",
    "Copy the prompt below.",
    "Replace the example details with your own real situation.",
    "Send it and read the answer.",
    "Ask one follow-up question to make the answer more useful."
  ];
}

function expertPracticeFor(id, title) {
  const prompt = expertPromptFor(id, title);
  const scenarios = {
    "what-is-api": "You want ARABAI to offer one simple button, such as Ask AI, while the website quietly sends the user's request to an AI provider in the background.",
    "official-api-platforms": "You need to decide which official AI kitchens ARABAI should buy from before packaging the result as simple tasks for users.",
    "api-price-comparison": "You want to estimate whether one ARABAI credit package can cover common jobs like chat answers, image generation, video tests, and music drafts.",
    "ai-gateway": "You want one ARABAI wallet to reach many AI models without asking normal users to open five different accounts.",
    "gateway-platforms": "You need to compare gateway platforms by model coverage, payment style, logs, stability, privacy, and backup options.",
    "gateway-risks": "You want ARABAI to feel simple for users, but the business must check what happens when a provider fails, changes price, or handles data poorly.",
    "multi-model-management": "You want to stop forcing one AI to do every job and build a simple model map.",
    "ai-automation": "You want AI to handle one repeatable business step, such as turning a form into an email draft.",
    "ai-for-teams": "A small team wants shared AI use without mixing passwords, private files, and uncontrolled cost.",
    "ai-for-business": "A business wants to introduce AI with rules, budget, tasks, and human review."
  };

  return {
    title: `Build it carefully: ${title}`,
    scenario: scenarios[id] || `You want to use ${title} in a real workflow, not only understand the name.`,
    steps: expertStepsFor(id),
    screens: simulatedScreensFor(id, title, prompt, expertStepsFor(id), expertResultFor(id)),
    result: expertResultFor(id),
    prompt
  };
}

function simulatedScreensFor(id, title, prompt, steps, result) {
  const tool = toolFor(id);
  const goal = goalFor(id, title);
  const firstResult = firstResultFor(id);
  const refinement = refinementFor(id);
  const safeResult = plainText(result).slice(0, 520);

  return [
    {
      kind: "simulated",
      title: "Simulated screen 1: Open the right place",
      text: `ARABAI simulated guide screen
Tool: ${tool}
Goal: ${goal}
What to do first: ${steps?.[0] || "Open the tool and start a new task."}
Privacy check: use a clean demo account and do not paste private data.`
    },
    {
      kind: "simulated",
      title: "Simulated screen 2: Paste the prompt",
      text: `Prompt box
${prompt}

Beginner tip: replace the example product, city, date, customer, or task with your own real details before sending.`
    },
    {
      kind: "simulated",
      title: "Simulated screen 3: Read the first result",
      text: `First result preview
${firstResult}

Do not stop here. Treat the first answer as a draft, not the final version.`
    },
    {
      kind: "simulated",
      title: "Simulated screen 4: Refine and finish",
      text: `Refinement prompt
${refinement}

Final check
${safeResult || "Check names, dates, prices, spelling, layout, privacy, and whether the result can be used by a normal customer."}`
    }
  ];
}

function toolFor(id) {
  if (id.includes("slides")) return "Gamma";
  if (id.includes("image") || id === "create-images" || id === "edit-images") return "image-2 or an image AI tool";
  if (id.includes("video") || id === "make-videos") return "image-2 plus CapCut, Canva, or another video editor";
  if (id.includes("music") || id === "make-music") return "Suno, Udio, Lyria, or another music AI tool";
  if (id.includes("api") || id.includes("gateway") || id.includes("model") || id.includes("automation") || id.includes("business") || id.includes("teams")) return "ARABAI planning workspace plus official provider pages";
  if (id.includes("login") || id.includes("subscription") || id.includes("price")) return "Official tool website and pricing page";
  if (id.includes("spreadsheet")) return "ChatGPT, Doubao, Gemini, Excel, or Google Sheets";
  if (id.includes("translate")) return "ChatGPT, Gemini, DeepL, or Google Translate";
  if (id.includes("document") || id.includes("kimi")) return "Kimi, Claude, ChatGPT, or another document-friendly AI";
  return "ChatGPT, Claude, Gemini, Doubao, or another official AI chat tool";
}

function goalFor(id, title) {
  const goals = {
    "what-is-ai": "finish one small AI task so the idea becomes real",
    "ai-basic-words": "understand basic AI words through a kitchen story",
    "why-ai-costs-money": "understand why text, images, video, and credits cost differently",
    "what-is-a-prompt": "turn a messy idea into a clear AI prompt",
    "common-ai-tools": "choose one starting tool for each job",
    "how-to-start": "send your first useful AI request",
    "free-vs-paid": "decide whether free AI is enough for now",
    "make-slides": "create a small editable presentation",
    "create-images": "create a poster image with readable text",
    "make-videos": "build a short video from 9 planned images",
    "make-music": "create a short background music idea",
    "what-is-api": "understand how ARABAI can send a user request to AI in the background",
    "ai-gateway": "understand one wallet and many AI model routes"
  };

  return goals[id] || `complete the task: ${title}`;
}

function firstResultFor(id) {
  const results = {
    "write-with-ai": "The AI writes a polite customer message, but it may still be too long or too formal.",
    "make-a-plan": "The AI gives a 7-day plan with daily actions, but some tasks may need to be shortened for a small team.",
    "make-slides": "Gamma gives an outline for 6 slides. You should read the outline before generating the full deck.",
    "spreadsheets": "The AI turns messy sales notes into a table and suggests total sales, average sales, and best product.",
    "create-images": "The image tool creates a poster draft. The picture may look good, but the text or layout may need correction.",
    "edit-images": "The image tool cleans the background. Check whether the product label, cap, color, and shape stayed correct.",
    "make-videos": "The image tool creates the first set of 9 frames. Some frames may not match the same product style.",
    "make-music": "The music tool creates a first track. It may be too loud, too busy, or too much like a full song.",
    "translate": "The AI translates the message into Arabic and gives a back-translation so you can check meaning.",
    "summarize-documents": "The AI extracts price, delivery, payment terms, risks, and next actions from the proposal.",
    "what-is-api": "The AI explains the hidden service window: user clicks, ARABAI sends the request, AI returns the answer.",
    "ai-gateway": "The AI explains the train-station idea: one entrance, many routes, different prices and speeds."
  };

  return results[id] || "The AI gives a first draft. It may be useful, but it still needs checking and one clear improvement request.";
}

function refinementFor(id) {
  const refinements = {
    "write-with-ai": "Make it shorter, warmer, and suitable for WhatsApp. Keep only the important details.",
    "make-a-plan": "Turn this into a checklist I can follow day by day. Remove anything a small team cannot do.",
    "make-slides": "Make the outline more practical for a small shop owner. Keep six slides and use simple English.",
    "spreadsheets": "Show the formulas I can copy into Excel, and explain the total and best product in one sentence.",
    "create-images": "Fix only the text and layout. Keep the product, black and gold style, and square Instagram format.",
    "edit-images": "Keep the product exactly the same. Only improve the background, light, and shadow.",
    "make-videos": "Make all 9 frames use the same product, same color, same lighting, and clear final call to action.",
    "make-music": "Make it simpler and softer so it works as background music under a product video.",
    "translate": "Make the Arabic more natural for Saudi customers, then give me a simple English back-translation.",
    "summarize-documents": "Separate facts from suggestions and turn the result into action items.",
    "what-is-api": "Explain it with one user story and do not mention code unless absolutely needed.",
    "ai-gateway": "Compare gateway access with official API access using the train-station example."
  };

  return refinements[id] || "Make the result shorter, clearer, more practical, and easier for a normal beginner to use.";
}

function plainText(html) {
  return String(html || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|li|h[1-6]|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#039;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function expertPromptFor(id, title) {
  const prompts = {
    "what-is-api": "Explain API like I am building ARABAI for normal users. Use a restaurant service window example. Show how a user clicks a button, ARABAI sends the order to AI, AI returns the result, and credits pay for the work.",
    "official-api-platforms": "Help me compare official API platforms for ARABAI. Cover writing, image, video, audio, account setup, API key, billing limit, privacy rule, and which jobs each platform is best for. Use simple language.",
    "api-price-comparison": "Estimate a simple ARABAI credits budget. Use examples: 1,000 short chat answers, 100 images, 20 short video tests, and 50 music drafts per month. Make a table with cost driver, risk, and how to protect margin without confusing users.",
    "ai-gateway": "Explain an AI Gateway like a train station for ARABAI. One wallet, many model routes, different prices and speeds. Give a beginner setup checklist and explain when to use gateway access versus official APIs.",
    "gateway-platforms": "Make a comparison table for AI gateway platforms for ARABAI. Columns: supported model types, payment style, API key handling, usage logs, privacy notes, backup value, and risk.",
    "gateway-risks": "Review the risks of using an AI gateway for a credit-based AI website like ARABAI. Check privacy, uptime, billing surprises, model availability, refunds, provider lock-in, and backup plan.",
    "multi-model-management": "Help me choose different AI models for writing, translation, image prompts, coding help, and document summaries. Make a simple model map.",
    "ai-automation": "Design one simple AI automation for my business. Input: customer form. AI task: draft reply. Output: message for human review. Include safety checks.",
    "ai-for-teams": "Create simple team rules for using AI: what tools to use, what data not to paste, who pays, who reviews answers, and how to store useful prompts.",
    "ai-for-business": "Make a 30-day AI adoption plan for a small business. Include tasks, tools, budget, privacy rules, team training, and review process."
  };

  return prompts[id] || `Help me turn ${title} into a real workflow. Give steps, cost checks, safety checks, and a small first test.`;
}

function expertStepsFor(id) {
  const steps = {
    "what-is-api": [
      "Choose one simple ARABAI job, such as Ask AI, Create Image, or Make Slide Outline.",
      "Write what the user will type and what result they should receive.",
      "Choose the AI provider that will do the work in the background.",
      "Keep the API key on the server, never inside the public webpage.",
      "Convert the provider's cost into a simple ARABAI credit cost.",
      "Mark the feature as coming soon until payment, refunds, account balance, and support rules are ready."
    ],
    "official-api-platforms": [
      "List the jobs ARABAI wants to offer: chat, image, video, music, slides, documents.",
      "Match each job to one official platform or provider.",
      "Create official accounts only when you are ready to test.",
      "Create test API keys and store them privately.",
      "Set small monthly limits before any user-facing launch.",
      "Write a beginner explanation for the difference between official provider billing and ARABAI credits."
    ],
    "api-price-comparison": [
      "Write the common tasks users may buy with credits.",
      "Estimate a small, normal, and heavy month for each task.",
      "Compare cheap models, stronger models, and creative models separately.",
      "Add a safety margin because images and videos can become expensive quickly.",
      "Turn the result into simple credit packages that normal users can understand.",
      "Show the user an estimated credit range before any heavy image, video, or music task runs."
    ],
    "ai-gateway": [
      "Choose one gateway for testing, not for full business dependence on day one.",
      "Add a small balance or strict spending limit.",
      "Test the same ARABAI task across two or three models.",
      "Compare speed, quality, price, error rate, and language quality for Arabic users.",
      "Keep official API routes for sensitive or high-value tasks."
    ],
    "gateway-platforms": [
      "List the models you actually need.",
      "Check whether the platform supports them.",
      "Check payment method, API key rules, and usage logs.",
      "Run one small test before moving real work.",
      "Keep a backup platform or official API option."
    ],
    "gateway-risks": [
      "Read privacy and data handling notes.",
      "Check whether the platform stores prompts or files.",
      "Set a small balance and spending alert.",
      "Do not send private customer data in the first test.",
      "Prepare a backup route if the gateway stops working."
    ],
    "multi-model-management": [
      "List your work types.",
      "Choose one model for each type.",
      "Write when to use the cheap model and when to use the stronger one.",
      "Test the same task across models.",
      "Keep the model map simple enough for a normal teammate to follow."
    ],
    "ai-automation": [
      "Pick one repeatable task that happens every week.",
      "Define input, AI action, output, and reviewer.",
      "Test with fake data first.",
      "Add a human approval step.",
      "Only then connect it to real forms, email, or spreadsheets."
    ],
    "ai-for-teams": [
      "Choose approved AI tools for the team.",
      "Write what information cannot be pasted into AI.",
      "Create shared prompt templates.",
      "Decide who reviews important outputs.",
      "Check usage and cost every month."
    ],
    "ai-for-business": [
      "Pick three business tasks where AI can save time.",
      "Choose tools and budget for a one-month test.",
      "Write privacy and review rules.",
      "Train the team with real examples.",
      "Measure time saved, quality, mistakes, and cost."
    ]
  };

  return steps[id] || [
    "Choose one small workflow.",
    "Run a test with safe sample data.",
    "Check cost, privacy, and quality.",
    "Add human review.",
    "Scale only after the first test works."
  ];
}

function expertResultFor(id) {
  const results = {
    "what-is-api": "<p><strong>What you should finish:</strong> one ARABAI feature map: user button, AI provider, expected result, credit cost, human review rule, and a clear Coming Soon note for anything not live yet.</p>",
    "official-api-platforms": "<p><strong>What you should finish:</strong> a provider map showing which official API can power chat, image, video, music, slides, and documents, plus a simple explanation of official billing versus ARABAI credits.</p>",
    "api-price-comparison": "<p><strong>What you should finish:</strong> a simple credit budget with low, normal, and heavy usage cases before selling any wallet balance, plus a rule for showing estimated credits before expensive media tasks.</p>",
    "ai-gateway": "<p><strong>What you should finish:</strong> a gateway test comparing routes for the same ARABAI task, with speed, quality, Arabic quality, and cost notes.</p>",
    "gateway-platforms": "<p><strong>What you should finish:</strong> a gateway comparison table plus one official API backup route for important work.</p>",
    "gateway-risks": "<p><strong>What you should finish:</strong> a launch checklist covering privacy, uptime, billing, refunds, provider changes, and backup routes.</p>",
    "multi-model-management": "<p><strong>What you should finish:</strong> a simple model map: which model handles writing, summaries, images, video, and stronger reasoning.</p>",
    "ai-automation": "<p><strong>What you should finish:</strong> one automation plan with input, AI step, output, reviewer, and stop rule.</p>",
    "ai-for-teams": "<p><strong>What you should finish:</strong> team AI rules that cover tools, data, review, templates, and monthly cost.</p>",
    "ai-for-business": "<p><strong>What you should finish:</strong> a 30-day business AI test plan with tasks, people, budget, and review points.</p>"
  };

  return results[id] || "<p><strong>What you should finish:</strong> one small expert-level AI test that can be checked before it touches real users or real money.</p>";
}

function titleFor(id) {
  const all = [...beginnerArticles, ...advancedSpecs, ...toolAdvanced, ...expertArticles, ...expertToolArticles];
  return (all.find((item) => item[0] === id) || [id, "Next article"])[1];
}

const ARTICLES = {};

for (const item of beginnerArticles) ARTICLES[item[0]] = basicArticle(item);
for (const item of advancedSpecs) ARTICLES[item[0]] = advancedArticle(item);
for (const item of toolAdvanced) ARTICLES[item[0]] = advancedArticle(item);
for (const item of expertArticles) ARTICLES[item[0]] = expertArticle(item);
for (const [id, title] of expertToolArticles) {
  ARTICLES[id] = expertArticle([id, title, `${title} is like moving from using a tool by hand to placing that tool inside a real workflow.`, "what-is-api"]);
}

ARTICLES["gemini-advanced"].tutorialVideo = {
  title: "شرح Gemini بالفيديو",
  summary: "الفيديو الأصلي بالصينية، وARABAI يضيف لك شرحا عربيا مبسطا. ستتعلم متى تستخدم Deep Research، إنشاء الصور، إنشاء الفيديو، Canvas، وLearning Tutor.",
  src: "/assets/videos/gemini-tools-guide-arabai-ar-voice.mp4",
  subtitles: "/assets/subtitles/gemini-tools-guide-ar.vtt",
  link: "/ar-tutorials.html#gemini-video",
  chapters: [
    "00:44 - Deep Research للبحث العميق",
    "02:46 - إنشاء الصور",
    "05:17 - إنشاء الفيديو",
    "08:03 - Canvas",
    "10:21 - Learning Tutor"
  ],
  promptNotes: [
    {
      label: "برومبت البحث العميق",
      text: "استخدم Deep Research لعمل تقرير مبسط عن سوق القهوة المختصة في السعودية. أريد أهم الاتجاهات الحالية، أنواع العملاء، فرص المتاجر الصغيرة، المخاطر، وخلاصة عملية لصاحب مقهى مبتدئ. اكتب بلغة سهلة وغير تقنية."
    },
    {
      label: "برومبت الصورة",
      text: "أنشئ بوستر مربعا لإنستغرام عن عطر عود فاخر. الخلفية سوداء وبنية دافئة. الإضاءة ذهبية. المنتج واضح في المنتصف. النص سهل القراءة على الهاتف."
    },
    {
      label: "برومبت الفيديو",
      text: "أنشئ فيديو قصيرا مدته ثماني ثوان. المشهد: صحراء واسعة وقت الغروب. الحركة: الكاميرا تتحرك ببطء فوق الرمال. الأسلوب: واقعي وسينمائي. الإضاءة: ضوء ذهبي ناعم. لا تضف أشخاصا أو نصوصا داخل الفيديو."
    },
    {
      label: "برومبت المدرس التعليمي",
      text: "تصرف كمدرس خاص. أريد تعلم أساسيات المحاسبة لمتجر صغير. ابدأ بسؤالين لتعرف مستواي، ثم اشرح لي الدرس الأول بمثال بسيط، وبعدها اختبرني بثلاثة أسئلة وصحح إجاباتي."
    }
  ]
};

ARTICLES["chatgpt-advanced"].tutorialVideo = {
  title: "شرح ChatGPT بالفيديو",
  summary: "الفيديو الأصلي بالصينية، وARABAI يضيف لك شرحا عربيا مبسطا. ستتعلم كيف تستخدم ChatGPT مع الصور، الصوت، الملفات، البحث العميق، Canvas، والمشاريع.",
  src: "/assets/videos/chatgpt-guide-arabai-ar-voice-fixed.mp4",
  subtitles: "/assets/subtitles/chatgpt-guide-ar.vtt",
  link: "/ar-tutorials.html#chatgpt-video",
  chapters: [
    "00:28 - GPT-4o وفهم النص والصورة والصوت",
    "02:26 - تحليل الملفات والجداول",
    "03:44 - Deep Research",
    "05:44 - GPT خاص للمهام المتكررة",
    "06:40 - Canvas",
    "07:44 - المشاريع وتنظيم العمل",
    "09:10 - Sora والفيديو القصير"
  ],
  promptNotes: [
    {
      label: "برومبت فهم صورة منتج",
      text: "اشرح لي ما في هذه الصورة، واكتب ثلاث جمل إعلانية بأسلوب بسيط وممتع."
    },
    {
      label: "برومبت تلخيص تسجيل صوتي",
      text: "لخص هذا التسجيل. اكتب أهم النقاط، استخرج المهام المطلوبة، واقترح ثلاث خطوات متابعة."
    },
    {
      label: "برومبت تحليل جدول",
      text: "حلل هذا الجدول. استخرج الاتجاه العام، اعرض أفضل المنتجات، واكتب لي ثلاث نصائح عملية."
    },
    {
      label: "برومبت البحث العميق",
      text: "استخدم البحث العميق لعمل تقرير مبسط عن سوق المقاهي المختصة في السعودية. أريد الاتجاهات الحالية، أنواع العملاء، الفرص، المخاطر، وخلاصة عملية لصاحب مشروع صغير. اكتب بلغة سهلة وغير تقنية."
    },
    {
      label: "برومبت فيديو قصير",
      text: "أنشئ فيديو قصيرا لمدينة في الليل، بإضاءة نيون، وحركة كاميرا بطيئة، وبأسلوب سينمائي."
    }
  ]
};

ARTICLES["claude-advanced"].tutorialVideo = {
  title: "شرح Claude بالفيديو",
  summary: "الفيديو الأصلي بالصينية، وARABAI يضيف لك شرحا عربيا مبسطا. ستتعرف على التسجيل، اختيار النموذج، رفع الملفات، Projects، Skills، Connectors، وArtifacts.",
  src: "/assets/videos/claude-guide-arabai-ar-voice.mp4",
  subtitles: "/assets/subtitles/claude-guide-ar.vtt",
  link: "/ar-tutorials.html#claude-video",
  chapters: [
    "00:25 - التسجيل والنسخة المجانية",
    "00:55 - متى تستخدم Claude؟",
    "01:25 - رفع الملفات والصور",
    "01:57 - Projects وSkills",
    "02:37 - Connectors والبحث في الويب",
    "03:43 - Artifacts",
    "04:10 - متى تحتاج الاشتراك؟"
  ],
  promptNoteText: "هذا الفيديو يركز أكثر على التعرف على الواجهة وطريقة البدء، وليس على برومبتات طويلة محددة. لذلك خذه كفيديو فهم للأقسام الرئيسية: الملفات، Projects، Skills، Connectors، وArtifacts."
};

ARTICLES["make-slides"].tutorialVideo = {
  title: "شرح Gamma بالفيديو",
  summary: "الفيديو الأصلي بالصينية، وARABAI يضيف لك شرحا عربيا مبسطا. ستتعلم كيف تحول النص أو الموضوع إلى عرض تقديمي، ثم تراجع المخطط والقالب والصور.",
  src: "/assets/videos/gamma-guide-arabai-ar-voice.mp4",
  subtitles: "/assets/subtitles/gamma-guide-ar.vtt",
  link: "/ar-tutorials.html#gamma-video",
  chapters: [
    "00:18 - الدخول إلى Gamma",
    "00:38 - لصق النص واختيار نوع العرض",
    "01:05 - ضبط طول النص",
    "01:31 - اختيار مصدر الصور",
    "01:57 - اختيار القالب والتوليد",
    "02:18 - البدء من موضوع فقط"
  ],
  promptNotes: [
    {
      label: "برومبت موضوع فقط",
      text: "أنشئ عرضا عن تطور الذكاء الاصطناعي في السنوات الأخيرة، وأهم استخداماته في العمل، وما الاتجاهات المتوقعة في المستقبل."
    },
    {
      label: "تعليمات مراجعة المخطط",
      text: "اجعل المخطط أوضح للمبتدئين، ورتب الشرائح من التعريف إلى التطبيقات ثم الخلاصة."
    }
  ]
};

ARTICLES["create-images"].tutorialVideo = {
  title: "شرح image-2 بالفيديو",
  summary: "الفيديو الأصلي بالصينية، وARABAI يلخصه لك بالعربية بطريقة عملية. هذا الفيديو لا يشرح زرارا واحدا فقط، بل يريك كيف يستخدم image-2 في البوسترات، تحسين صور المنتجات، صفحات المتاجر، والشرح البصري الطويل.",
  src: "/assets/videos/image2-guide-arabai-ar-voice.mp4",
  subtitles: "/assets/subtitles/image2-guide-ar.vtt",
  link: "/ar-tutorials.html#image2-video",
  chapters: [
    "00:00 - ما هو image-2 ولماذا يهم المصمم والمبتدئ",
    "01:20 - تعديل صورة موجودة بدل البدء من الصفر",
    "02:30 - كتابة وصف طويل لتحسين النتيجة",
    "03:10 - تحويل صورة منتج عادية إلى صورة إعلان أقوى",
    "04:30 - استخدامه في بوسترات ومنشورات التجارة",
    "05:40 - إنشاء صفحات طويلة وعرض معلومات كثيرة بصريا",
    "06:50 - تصميم هوية وعناصر علامة تجارية",
    "07:40 - استخراج عناصر التصميم وتحليل الصور",
    "08:20 - متى يناسبك image-2 ومتى تحتاج أداة أخرى"
  ],
  promptNotes: [
    {
      label: "ترجمة فكرة البرومبت: عدل الصورة الحالية ولا تغيّر الجو العام",
      text: "عدّل هذه الصورة اعتمادا على النسخة الحالية. حافظ على الإضاءة الأساسية والألوان العامة، لكن اجعل التكوين أنظف وأكثر جاذبية، وامنح المشهد إحساسا إعلانيا أجمل."
    },
    {
      label: "ترجمة فكرة البرومبت: حول صورة منتج عادية إلى صورة إعلان",
      text: "استخدم صورة المنتج هذه كمرجع أساسي. حافظ على شكل العبوة والشعار واللون، ثم أنشئ نسخة إعلانية أكثر احترافية بخلفية قوية، وإضاءة أوضح، وتفاصيل تجعل المنتج يبدو جاهزا للحملة التسويقية."
    },
    {
      label: "ترجمة فكرة البرومبت: أنشئ بوستر أو صفحة طويلة من منتج واحد",
      text: "أنشئ بوسترا أو صفحة تعريف طويلة لهذا المنتج. اجعل العنوان واضحا، ووزّع المزايا في أقسام سهلة القراءة، وأضف صورا فرعية أو زوايا مختلفة تساعد العميل على الفهم بسرعة."
    },
    {
      label: "ترجمة فكرة البرومبت: اشرح المنتج بصريا",
      text: "حوّل هذه المعلومات أو هذه الصورة إلى تصميم بصري يشرح الفكرة خطوة بخطوة. استخدم عناوين قصيرة، وأجزاء منفصلة، ورسومات أو مؤشرات تساعد الشخص العادي على الفهم من أول نظرة."
    },
    {
      label: "ترجمة فكرة البرومبت: أنشئ هوية أولية للعلامة",
      text: "صمّم اتجاها بصريا أوليا لهذه العلامة يشمل الشعار، ألوانا مناسبة، أسلوب الصور، وأمثلة سريعة على التغليف أو الملابس أو المواد الدعائية، حتى أستطيع تقييم الاتجاه قبل التنفيذ النهائي."
    }
  ]
};

ARTICLES["make-videos"].tutorialVideo = {
  title: "شرح صناعة فيديو AI بالفيديو",
  summary: "الفيديو الأصلي بالصينية، وARABAI يضع لك الفكرة بالعربية: للمبتدئ لا تبدأ بالفيديو مباشرة، بل اصنع 9 صور متسلسلة أولا، ثم حوّلها إلى فيديو قصير.",
  src: "/assets/videos/videomake-guide-arabai-ar-voice.mp4",
  subtitles: "/assets/subtitles/videomake-guide-ar.vtt",
  link: "/ar-tutorials.html#videomake-video",
  chapters: [
    "00:00 - لماذا نبدأ بتسع صور بدلا من فيديو مباشر؟",
    "00:15 - كتابة برومبت يحافظ على نفس الشخصية في كل الصور",
    "00:30 - توليد الصور التسع كلوحة قصة",
    "00:45 - تحويل الصور المتناسقة إلى فيديو قصير",
    "00:54 - الخلاصة: الصور أولا، ثم الحركة"
  ],
  promptNotes: [
    {
      label: "ترجمة البرومبت الأساسي من الفيديو",
      text: "أنت خبير في صناعة القصص المصورة بالذكاء الاصطناعي. أنشئ 9 صور متسلسلة لفيديو قصير. حافظ على نفس الشخصيات، نفس الأسلوب، نفس الإضاءة، ونفس الجو في كل الصور. لا تغيّر شكل الشخصيات بين لقطة وأخرى."
    },
    {
      label: "هيكل التسع لقطات",
      text: "اللقطة 1: بداية المشهد. اللقطة 2 إلى 4: بداية الحركة. اللقطة 5 إلى 7: الحدث الأساسي. اللقطة 8: ما قبل النهاية. اللقطة 9: لقطة النهاية."
    },
    {
      label: "تعليمات الاتساق",
      text: "اجعل كل الصور بنفس الأسلوب البصري، واحتفظ بنفس الشخصيات أو المنتج، ولا تولد صورا متفرقة تبدو كأنها من قصص مختلفة."
    }
  ]
};

window.ARTICLES = ARTICLES;
