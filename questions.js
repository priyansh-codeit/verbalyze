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
      }
    ]
  }
};

// Export to window object for browser access
window.QUESTIONS = QUESTIONS;
