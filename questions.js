// MockMate AI Question Bank
const QUESTIONS = {
  behavioral: {
    junior: [
      {
        id: "b_jr_1",
        question: "Can you describe a time when you had to work closely with a colleague who had a very different work style from yours? How did you manage it?",
        keywords: ["communication", "collaboration", "compromise", "respect", "listen", "understand", "talked"],
        tips: "Focus on empathy, open communication, and finding common ground."
      },
      {
        id: "b_jr_2",
        question: "Tell me about a project that didn't go as planned. What went wrong, and what did you learn from the experience?",
        keywords: ["failure", "learned", "adapted", "responsibility", "improve", "reflection", "timeline"],
        tips: "Acknowledge the failure honestly, take responsibility, and emphasize your learnings."
      },
      {
        id: "b_jr_3",
        question: "How do you prioritize your tasks when you have multiple deadlines approaching at the same time?",
        keywords: ["prioritize", "schedule", "calendar", "urgency", "importance", "communicate", "jira", "trello"],
        tips: "Mention tools or frameworks you use (like Eisenhower matrix or simple to-do lists) and how you communicate delays."
      },
      {
        id: "b_jr_4",
        question: "Can you tell me about a time when you had to learn a new technology or tool quickly for a task? How did you approach learning it?",
        keywords: ["learn", "rapid", "tutorial", "documentation", "mentor", "practice", "built"],
        tips: "Discuss your methodology for fast-tracked learning, such as checking official docs, building mini-projects, or seeking guidance."
      },
      {
        id: "b_jr_5",
        question: "Tell me about a time you made a mistake at work or on a project. How did you handle it, and what was the outcome?",
        keywords: ["mistake", "apologized", "fixed", "responsible", "learned", "help", "honest"],
        tips: "Take clear ownership of the error, explain your remediation steps immediately, and highlight how you prevented it in the future."
      },
      {
        id: "b_jr_6",
        question: "Describe a situation where you had to explain a complex technical concept to a non-technical person. How did you ensure they understood?",
        keywords: ["analogy", "simplified", "non-technical", "listening", "feedback", "diagram"],
        tips: "Explain how you avoided jargon, utilized metaphors/analogies, and checked for comprehension through active listening."
      }
    ],
    mid: [
      {
        id: "b_mid_1",
        question: "Describe a situation where you had a major disagreement with a team lead or manager on a technical decision. How was it resolved?",
        keywords: ["disagreement", "constructive", "evidence", "compromise", "respectful", "alignment", "data", "test"],
        tips: "Show that you bring data-driven arguments but respect the final decision of the lead."
      },
      {
        id: "b_mid_2",
        question: "Tell me about a time you had to take ownership of a feature or project with vague requirements. How did you proceed?",
        keywords: ["ownership", "clarified", "requirements", "stakeholders", "initiative", "questions", "mockup"],
        tips: "Highlight your proactive communication, setting milestones, and clarifying scope with stakeholders."
      },
      {
        id: "b_mid_3",
        question: "How do you handle giving constructive feedback to a peer, and can you share an example of when you did so successfully?",
        keywords: ["feedback", "constructive", "growth", "empathy", "private", "specific", "positive"],
        tips: "Ensure feedback was specific, actionable, delivered privately, and aimed at their professional growth."
      },
      {
        id: "b_mid_4",
        question: "Tell me about a time you had to balance technical debt with delivering a feature quickly. How did you make the decision?",
        keywords: ["technical debt", "trade-off", "refactor", "roadmap", "velocity", "risk"],
        tips: "Explain your rationale, how you negotiated timelines with product owners, and your plans for paying off the technical debt."
      },
      {
        id: "b_mid_5",
        question: "Describe a project where you had to collaborate with team members across different time zones or departments. What communication strategies did you use?",
        keywords: ["asynchronous", "slack", "documentation", "time-zones", "handover", "alignment"],
        tips: "Highlight asynchronous communication practices, thorough handoff documentation, and optimizing overlapping synchronous windows."
      },
      {
        id: "b_mid_6",
        question: "Tell me about a time you noticed a bottleneck or inefficiency in your team's development workflow. What action did you take to resolve it?",
        keywords: ["automation", "ci/cd", "bottleneck", "process", "pr review", "documentation"],
        tips: "Discuss identifying the root cause, proposing a systemized solution (such as automation or linting rules), and helping the team adapt."
      }
    ],
    senior: [
      {
        id: "b_sr_1",
        question: "Tell me about a time you championed a major technical initiative or refactoring that met with initial resistance. How did you get buy-in?",
        keywords: ["buy-in", "metrics", "prototype", "presentation", "stakeholders", "alignment", "influence", "risk"],
        tips: "Demonstrate how you mapped technical benefits to business outcomes and built consensus gradually."
      },
      {
        id: "b_sr_2",
        question: "Describe a scenario where you had to mentor a junior engineer who was struggling to meet expectations. What was your approach?",
        keywords: ["mentor", "empathy", "action-plan", "pair-programming", "growth", "check-ins", "patience"],
        tips: "Focus on support, identifying root causes, pair programming, and setting clear, incremental milestones."
      },
      {
        id: "b_sr_3",
        question: "How do you handle trade-offs between speed-to-market and architectural perfection under tight business constraints?",
        keywords: ["trade-off", "technical debt", "prioritization", "pragmatic", "milestones", "business value", "compromise"],
        tips: "Explain how you document technical debt, deliver pragmatically, and plan for future iterations."
      },
      {
        id: "b_sr_4",
        question: "Describe a time when you had to make a high-stakes decision with incomplete or conflicting information. How did you evaluate the risks?",
        keywords: ["risk mitigation", "data-driven", "assumptions", "impact", "decision-matrix", "consequences"],
        tips: "Walk through your framework for risk evaluation, how you gathered validation indicators, and how you communicated risks to leaders."
      },
      {
        id: "b_sr_5",
        question: "Tell me about a time you had to manage conflict between two strong technical members of your team. How did you mediate and resolve it?",
        keywords: ["mediation", "compromise", "collaboration", "objectivity", "one-on-one", "common ground"],
        tips: "Focus on separating personal opinions from engineering facts, holding 1-on-1s, and guiding the peers toward shared technical guidelines."
      },
      {
        id: "b_sr_6",
        question: "How do you align technical roadmap objectives with general business strategy? Share an example of where you successfully did this.",
        keywords: ["business value", "roi", "roadmap", "kpi", "stakeholders", "revenue", "retention"],
        tips: "Show how you tied refactoring or architectural migrations to quantifiable business targets like latency decreases leading to conversion boosts."
      }
    ]
  },
  technical: {
    junior: [
      {
        id: "t_jr_1",
        question: "What is the event loop in JavaScript, and how does it handle asynchronous code execution?",
        keywords: ["event loop", "call stack", "callback queue", "microtasks", "macrotasks", "asynchronous", "single-threaded", "promises"],
        tips: "Explain the stack, the heap, the queue, and how promises differ from setTimeout in terms of task queues."
      },
      {
        id: "t_jr_2",
        question: "What is the difference between relative, absolute, fixed, and sticky positioning in CSS?",
        keywords: ["position", "relative", "absolute", "fixed", "sticky", "document flow", "viewport", "parent"],
        tips: "Clarify how each positioning context affects the element's position relative to its parents or the viewport."
      },
      {
        id: "t_jr_3",
        question: "Explain what a REST API is and what HTTP methods are commonly used, describing their purposes.",
        keywords: ["rest", "http", "get", "post", "put", "delete", "stateless", "resources", "endpoint"],
        tips: "Name GET, POST, PUT, DELETE, and mention that REST is stateless and revolves around resource URLs."
      },
      {
        id: "t_jr_4",
        question: "Explain the difference between '==' and '===' in JavaScript, and what type coercion means.",
        keywords: ["coercion", "strict equality", "loose equality", "type conversion", "values", "comparison"],
        tips: "Describe how loose equality (==) performs type conversion before comparison, while strict equality (===) compares values and types directly."
      },
      {
        id: "t_jr_5",
        question: "What is the difference between semantic HTML and non-semantic HTML? Why is semantic HTML important for accessibility?",
        keywords: ["accessibility", "seo", "semantic", "screen readers", "tags", "header", "article", "div"],
        tips: "Discuss screen reader navigation, layout clarity, SEO benefits, and replacing generic divs with elements like article, nav, or main."
      },
      {
        id: "t_jr_6",
        question: "What is scope in JavaScript, and what is the difference between global, function, and block scope?",
        keywords: ["scope", "let", "const", "var", "block scope", "global scope", "hoisting"],
        tips: "Detail the visibility boundaries of variables and clarify how var is function-scoped while let and const respect block scope rules."
      }
    ],
    mid: [
      {
        id: "t_mid_1",
        question: "Explain the concept of closures in JavaScript. Provide an example of how closures can be useful in real-world application design.",
        keywords: ["closure", "lexical scope", "encapsulation", "state preservation", "private variables", "inner function", "return"],
        tips: "Detail how an inner function retains access to the outer function's scope even after the outer function finishes executing."
      },
      {
        id: "t_mid_2",
        question: "How does React's virtual DOM work, and how does the reconciliation process optimize UI rendering?",
        keywords: ["virtual dom", "reconciliation", "diffing", "state change", "keys", "rerender", "fiber"],
        tips: "Focus on how React creates a lightweight representation of the DOM, compares it with the previous version, and updates only changed nodes."
      },
      {
        id: "t_mid_3",
        question: "What is the difference between SQL and NoSQL databases? In what scenarios would you choose one over the other?",
        keywords: ["sql", "nosql", "relational", "schema", "scaling", "acid", "document", "joins", "horizontal"],
        tips: "Discuss schemas (strict vs flexible), transactions (ACID vs BASE), and scaling (vertical vs horizontal)."
      },
      {
        id: "t_mid_4",
        question: "What are pure functions in JavaScript, and how do they relate to the concept of side effects?",
        keywords: ["pure function", "side effects", "immutability", "predictable", "deterministic", "input", "output"],
        tips: "Explain that pure functions always return the same output for the same input and modify nothing outside their scope."
      },
      {
        id: "t_mid_5",
        question: "Explain how CORS (Cross-Origin Resource Sharing) works and how you would fix a CORS block error.",
        keywords: ["cors", "headers", "origin", "preflight", "options", "server", "allow-origin"],
        tips: "Discuss the browser security model, the preflight OPTIONS request, and adding access control response headers at the server level."
      },
      {
        id: "t_mid_6",
        question: "What is the difference between standard Promise chains ('.then()/.catch()') and async/await syntax? How do they handle errors?",
        keywords: ["async/await", "promise", "try/catch", "syntactic sugar", "readable", "asynchronous"],
        tips: "Describe async/await as syntactic sugar over promises that simplifies error handling using standard try-catch blocks."
      }
    ],
    senior: [
      {
        id: "t_sr_1",
        question: "How would you handle optimization for a web application experiencing slow load times due to massive bundle sizes and slow API responses?",
        keywords: ["code splitting", "lazy loading", "caching", "cdn", "compression", "ssr", "optimizations", "bundle analysis", "gzip", "tree shaking"],
        tips: "Discuss bundle analysis, dynamic imports, service worker caching, HTTP/2 or HTTP/3, and backend caching/database indexing."
      },
      {
        id: "t_sr_2",
        question: "Explain the difference between optimistic concurrency control and pessimistic concurrency control in database systems, and when to use each.",
        keywords: ["concurrency", "optimistic", "pessimistic", "locks", "versioning", "conflicts", "race condition", "transactions"],
        tips: "Discuss how versioning/timestamping works for optimistic locks, and how row/table locks affect throughput in pessimistic locks."
      },
      {
        id: "t_sr_3",
        question: "How do you design, manage, and prevent cascading failures in a microservices architecture when one dependent service goes down?",
        keywords: ["circuit breaker", "fallback", "retry", "rate limiting", "graceful degradation", "idempotency", "resilience", "bulkhead"],
        tips: "Explain circuit breaker patterns (Netflix Hystrix, resilience4j), bulkhead patterns, timeouts, and fallback options."
      },
      {
        id: "t_sr_4",
        question: "What is the Critical Rendering Path in browser engines, and how do you optimize it for Web Vitals like LCP or FID?",
        keywords: ["critical rendering path", "dom", "cssom", "render tree", "layout", "paint", "blocking", "async", "defer"],
        tips: "Detail the parser flow, parsing blockage by CSS/JS, and optimization tricks like deferring scripts, inline critical CSS, and preloading assets."
      },
      {
        id: "t_sr_5",
        question: "Explain how the shadow DOM works, how it differs from the light DOM, and its role in Web Components.",
        keywords: ["shadow dom", "encapsulation", "web components", "scoped css", "light dom", "host"],
        tips: "Clarify CSS scoping, encapsulation, boundary mechanics (open vs closed mode), and building isolated, reusable custom elements."
      },
      {
        id: "t_sr_6",
        question: "What is a memory leak in JavaScript applications, what are some common causes, and how do you detect/fix them?",
        keywords: ["memory leak", "garbage collection", "closures", "event listeners", "detached dom", "chrome devtools"],
        tips: "Discuss persistent references, forgotton intervals, lingering DOM elements, and tracking them using the Memory profile in Chrome DevTools."
      }
    ]
  },
  "system-design": {
    junior: [
      {
        id: "s_jr_1",
        question: "If we need to build a simple URL shortener like Bitly, what are the primary database tables we need, and how would we redirect users?",
        keywords: ["database", "redirection", "url mapping", "hash key", "redirect code", "301", "302", "short code"],
        tips: "Focus on storing original URL, short code, and using HTTP 301 (permanent) or 302 (temporary) redirects."
      },
      {
        id: "s_jr_2",
        question: "What is a Load Balancer, and why is it important in scaling a web application?",
        keywords: ["load balancer", "distribution", "traffic", "scaling", "failover", "algorithms", "round-robin", "proxy"],
        tips: "Explain how a load balancer distributes incoming user requests across multiple backend servers to prevent overload and handle failures."
      },
      {
        id: "s_jr_3",
        question: "What is DNS, and how does a domain name resolve to an IP address when a user visits a website?",
        keywords: ["dns", "ip address", "resolver", "nameserver", "caching", "root server", "a record"],
        tips: "Outline hierarchical resolution: browser cache, DNS resolver query, Root servers, TLD servers, and Authoritative Nameserver response."
      },
      {
        id: "s_jr_4",
        question: "What is the difference between vertical scaling and horizontal scaling of database servers?",
        keywords: ["vertical scaling", "horizontal scaling", "cpu", "ram", "sharding", "replicas", "hardware"],
        tips: "Compare adding resources (CPU/RAM) to a single machine vs adding more database nodes/shards to distribute the load."
      },
      {
        id: "s_jr_5",
        question: "Explain the purpose of API Gateways in client-server architecture and what routing is.",
        keywords: ["api gateway", "routing", "rate limiting", "authentication", "load balancing", "entry point"],
        tips: "Define the gatekeeper role of API gateways: handling request routing, rate limiting, logging, and security verification."
      }
    ],
    mid: [
      {
        id: "s_mid_1",
        question: "How would you design a real-time chat application like WhatsApp or Slack? Focus on protocol selection, database storage, and presence indicator (online/offline).",
        keywords: ["websockets", "polling", "redis", "pub/sub", "nosql", "message queue", "presence", "scalability", "tcp"],
        tips: "Recommend WebSockets for persistent two-way connection, Redis for session/presence tracking, and partition-tolerant databases."
      },
      {
        id: "s_mid_2",
        question: "Explain how horizontal scaling differs from vertical scaling, and describe the role of database replication (master-replica) in supporting high read traffic.",
        keywords: ["horizontal scaling", "vertical scaling", "replication", "read replicas", "synchronous", "asynchronous", "consistency", "lag"],
        tips: "Discuss adding machines vs upgrading hardware, and replication lag vs read consistency in master-replica configurations."
      },
      {
        id: "s_mid_3",
        question: "How would you design a distributed caching layer using Redis? What are some common cache eviction policies?",
        keywords: ["redis", "lru", "ttl", "cache invalidation", "cache aside", "write through", "eviction"],
        tips: "Discuss cache-aside patterns, cache eviction strategies like Least Recently Used (LRU) or TTL limits, and database syncing."
      },
      {
        id: "s_mid_4",
        question: "What is a message queue (e.g. RabbitMQ or Kafka), and why is it useful for decoupling service interactions?",
        keywords: ["message queue", "asynchronous", "decoupling", "producer", "consumer", "pub/sub", "scalability"],
        tips: "Explain how asynchronous event processing prevents microservice dependency locks and manages traffic spikes smoothly."
      },
      {
        id: "s_mid_5",
        question: "Explain the CAP Theorem and how consistency, availability, and partition tolerance trade off in system design.",
        keywords: ["cap theorem", "consistency", "availability", "partition tolerance", "trade-off", "network partition"],
        tips: "Explain that in the presence of a network partition, you must choose either strict consistency (CP) or immediate availability (AP)."
      }
    ],
    senior: [
      {
        id: "s_sr_1",
        question: "Design a globally distributed video streaming service like Netflix. How would you handle content distribution, cache validation, and adapt to varying user bandwidth?",
        keywords: ["cdn", "hls", "transcoding", "caching", "geo-routing", "bandwidth adaptation", "storage layers", "edge", "dash"],
        tips: "Outline CDN edge nodes, HLS/DASH protocols for adaptive bitrate streaming, cloud transcoding pipelines, and user profile databases."
      },
      {
        id: "s_sr_2",
        question: "Design an idempotent distributed payment processing system. How do you guarantee exactly-once processing when communicating with third-party banks?",
        keywords: ["idempotency key", "distributed lock", "transaction log", "reconciliation", "retry mechanism", "exactly-once", "message queue", "db lock"],
        tips: "Emphasize using an idempotency key at API gateways, locking transactions in DB before external call, and out-of-band reconciliation jobs."
      },
      {
        id: "s_sr_3",
        question: "How would you architect a global rate limiter that operates across multiple server regions with low latency?",
        keywords: ["token bucket", "leaky bucket", "sliding window", "redis", "latency", "synchronization", "consistency"],
        tips: "Describe rate limiting algorithms, utilizing local Edge cache checking, and synchronization techniques using Redis Cluster."
      },
      {
        id: "s_sr_4",
        question: "Design a distributed tracing system for a large microservice network. How do you track request flows across network boundaries?",
        keywords: ["trace id", "span id", "context propagation", "opentelemetry", "jaeger", "latency analysis", "overhead"],
        tips: "Outline injecting trace headers at gateways, propagating span context through HTTP/RPC calls, and asynchronous trace collections."
      },
      {
        id: "s_sr_5",
        question: "Design a highly available and scalable notification system (SMS, Email, Push) that handles millions of alerts per minute.",
        keywords: ["message queue", "retry policy", "rate limiting", "provider fallback", "idempotency", "priority queues"],
        tips: "Detail using distributed queues (Kafka/RabbitMQ), rate limiters, fallback providers (Twilio, Sendgrid), and transaction logging."
      }
    ]
  }
};

// Export to window object for browser access
window.QUESTIONS = QUESTIONS;
