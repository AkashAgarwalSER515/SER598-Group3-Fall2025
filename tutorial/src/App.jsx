import React from "react";

/**
 * Group3 — Performant & Scalable Deployment Tutorial
 * ---------------------------------------------------
 * Complete React single-page tutorial website using TailwindCSS.
 * Includes:
 *  - 3000+ words of tutorial content
 *  - Sidebar TOC
 *  - Clean documentation layout
 *  - Conceptual explanations + step-by-step activities
 *  - Recommended project structure (ours, not mandatory)
 *  - Build/run/deploy commands for our demo
 *
 * This is the final tutorial website to be packaged in /tutorial for SER598.
 */

const sections = [
  {
    id: "intro",
    title: "1. Introduction",
    content: `
<p class="leading-relaxed">
Modern web applications often support users across regions, networks, and device types. They must be 
fast, reliable, scalable, and resilient to workload fluctuations. Traditional monolithic deployments 
struggle to meet these expectations. Cloud-native patterns — such as containerization, microservices, 
Kubernetes orchestration, CDN acceleration, and edge compute — enable systems to achieve global 
performance and elastic scaling.
</p>

<p class="leading-relaxed mt-4">
This tutorial walks learners through these technologies step-by-step so they can build their own 
<strong>performant and scalable deployment architecture</strong> using the same design patterns we used in our project. 
This tutorial is built in React and serves as an interactive, scrollable documentation website. 
All content is educational and conceptual, enabling students to apply these ideas to their own projects.
</p>

<p class="leading-relaxed mt-4">
By the end, learners will understand how to containerize their application, deploy it to Kubernetes (locally 
and on AWS EKS), configure Ingress routing, enable autoscaling, implement CDN and edge caching, and measure 
performance improvements in a clean, reproducible way.
</p>
`,
  },

  {
    id: "outcomes",
    title: "2. Learning Outcomes",
    content: `
<h3 class="font-semibold mt-4">Conceptual Understanding (Bloom: Understand / Analyze)</h3>
<ul class="list-disc ml-6 leading-relaxed">
  <li>Explain the purpose of containerization and how it eliminates environment inconsistencies.</li>
  <li>Describe Kubernetes constructs such as Pods, Deployments, ReplicaSets, Services, and Ingress.</li>
  <li>Differentiate between CDN caching and edge compute, and identify their performance benefits.</li>
  <li>Analyze performance bottlenecks in distributed systems and propose mitigation strategies.</li>
</ul>

<h3 class="font-semibold mt-4">Practical Skills (Bloom: Apply / Create)</h3>
<ul class="list-disc ml-6 leading-relaxed">
  <li>Implement and containerize a backend and frontend application.</li>
  <li>Deploy applications to Kubernetes clusters using declarative manifests.</li>
  <li>Configure Ingress routing and host-based/path-based routing.</li>
  <li>Use Horizontal Pod Autoscaler (HPA) to enable elastic scaling.</li>
  <li>Create Cloudflare Workers to enable edge caching and custom request handling.</li>
  <li>Measure cache HIT/MISS behavior and calculate performance improvements.</li>
</ul>

<h3 class="font-semibold mt-4">Critical Thinking (Bloom: Evaluate)</h3>
<ul class="list-disc ml-6 leading-relaxed">
  <li>Evaluate when Kubernetes is appropriate and when simpler hosting models suffice.</li>
  <li>Formulate opinions on CDN + Edge approaches compared to traditional cloud-only solutions.</li>
  <li>Predict future trends such as serverless Kubernetes, WASM at the edge, and distributed databases.</li>
</ul>
`,
  },

  {
    id: "background",
    title: "3. Background & History",
    content: `
<h3 class="font-semibold mt-4">3.1 Containerization</h3>
<p class="leading-relaxed">
Before Docker’s introduction in 2013, industries relied heavily on virtual machines — slow to boot, 
resource-intensive, and environment-dependent. Docker popularized image-based packaging and standardized 
execution through the Open Container Initiative (OCI). Containers allow applications to run consistently 
everywhere: on local machines, on CI servers, inside Kubernetes, or in the cloud.
</p>

<h3 class="font-semibold mt-4">3.2 Kubernetes</h3>
<p class="leading-relaxed">
Derived from Google's internal Borg and Omega schedulers, Kubernetes was open-sourced in 2014 as a 
general-purpose, declarative orchestration system for containers. It quickly became the industry standard. 
Kubernetes abstracts:
</p>

<ul class="list-disc ml-6 leading-relaxed">
  <li><strong>Pods</strong> — the smallest deployable unit.</li>
  <li><strong>Deployments</strong> — declarative desired state with rolling updates.</li>
  <li><strong>ReplicaSets</strong> — ensures correct number of pod replicas.</li>
  <li><strong>Services</strong> — reliable internal networking.</li>
  <li><strong>Ingress</strong> — routing traffic from outside the cluster.</li>
  <li><strong>Autoscaling</strong> — HPA, VPA, Cluster Autoscaler.</li>
</ul>

<h3 class="font-semibold mt-4">3.3 CDNs & Edge Compute</h3>
<p class="leading-relaxed">
Since 1998 (Akamai), CDNs have evolved from static file caching to full programmable platforms with 
edge compute (Cloudflare Workers, Fastly Compute). With 200+ POPs globally, CDNs now act as the “first hop,” 
reducing round-trip time to under 20ms in many cases.
</p>

<h3 class="font-semibold mt-4">3.4 Autoscaling</h3>
<p class="leading-relaxed">
Manual scaling is insufficient for modern traffic patterns. Kubernetes HPA introduced dynamic scaling 
based on CPU, memory, or custom metrics via Prometheus. Autoscaling is essential for cost-efficiency and 
resilience during spikes.
</p>
`,
  },

  {
    id: "architecture",
    title: "4. System Architecture Overview",
    content: `
<p class="leading-relaxed">
This tutorial’s architecture is intentionally general so learners can apply it to any application: 
an ecommerce app, analytics dashboard, game API, or internal tool. The architecture includes:
</p>

<pre class="bg-gray-900 text-gray-100 p-4 rounded-md text-sm overflow-auto whitespace-pre">
Client → CDN → Cloudflare Edge Worker → AWS Load Balancer → Kubernetes Ingress → Services → Pods
</pre>

<p class="leading-relaxed mt-4">
It combines the strengths of edge compute and cloud orchestration for performance and scalability. 
Later sections walk through how to reproduce this architecture using your own backend and frontend.
</p>
`,
  },

  {
    id: "structure",
    title: "5. Our Project Structure (Recommended Example)",
    content: `
<p class="leading-relaxed">
Below is <strong>the structure our team used</strong> for the project demo.  
This is not required for your own implementation — it simply illustrates how we organized 
our backend, frontend, Kubernetes manifests, and tutorial website.
</p>

<pre class="bg-gray-900 text-gray-100 p-4 rounded-md text-sm whitespace-pre overflow-auto">
project-root/
│
└─ demo/
    ├─ backend/
    │   ├─ src/
    │   ├─ package.json
    │   ├─ Dockerfile
    │   └─ README.md
    │
    ├─ frontend/
    │   ├─ src/
    │   ├─ index.html
    │   ├─ package.json
    │   ├─ Dockerfile
    │   └─ README.md
    │
    └─ k8s/
        ├─ namespace.yaml
        ├─ backend-deployment.yaml
        ├─ backend-service.yaml
        ├─ frontend-deployment.yaml
        ├─ frontend-service.yaml
        ├─ ingress.yaml
        ├─ hpa.yaml
        └─ README.md
 

</pre>

<p class="leading-relaxed mt-4">
A clean structure is vital for grading, clarity, and reproducibility.
</p>
`,
  },

  {
    id: "commands",
    title: "6. Build, Run & Deployment Commands (Our Demo Workflow)",
    content: `
<p class="leading-relaxed">
The commands below describe the workflow our team used to prepare, build, deploy, and test the tutorial demo.
Students following this tutorial can apply the same workflow to their own backend and frontend applications.
</p>

<h3 class="font-semibold mt-4">1. Build backend</h3>
<pre class="bg-gray-900 text-gray-100 p-4 rounded-md text-sm whitespace-pre">
cd demo/backend
npm install
node index.js   # optional local check
</pre>

<h3 class="font-semibold mt-4">2. Build frontend</h3>
<pre class="bg-gray-900 text-gray-100 p-4 rounded-md text-sm whitespace-pre">
cd demo/frontend
npm install
npm run dev
</pre>

<h3 class="font-semibold mt-4">3. Use Minikube’s Docker daemon</h3>
<pre class="bg-gray-900 text-gray-100 p-4 rounded-md text-sm whitespace-pre">
eval $(minikube docker-env)
</pre>

<h3 class="font-semibold mt-4">4. Build Docker images</h3>
<pre class="bg-gray-900 text-gray-100 p-4 rounded-md text-sm whitespace-pre">
docker build -t scalable-backend:latest ./demo/backend
docker build -t scalable-frontend:latest ./demo/frontend
</pre>

<h3 class="font-semibold mt-4">5. Start Minikube</h3>
<pre class="bg-gray-900 text-gray-100 p-4 rounded-md text-sm whitespace-pre">
minikube start --cpus=4 --memory=8192 --driver=docker
minikube addons enable ingress
minikube addons enable metrics-server
</pre>

<h3 class="font-semibold mt-4">6. Apply Kubernetes resources</h3>
<pre class="bg-gray-900 text-gray-100 p-4 rounded-md text-sm whitespace-pre">
kubectl apply -f demo/k8s/namespace.yaml
kubectl apply -f demo/k8s/backend-deployment.yaml -n scalable-demo
kubectl apply -f demo/k8s/backend-service.yaml -n scalable-demo
kubectl apply -f demo/k8s/frontend-deployment.yaml -n scalable-demo
kubectl apply -f demo/k8s/frontend-service.yaml -n scalable-demo
kubectl apply -f demo/k8s/ingress.yaml -n scalable-demo
kubectl apply -f demo/k8s/hpa.yaml -n scalable-demo
</pre>

<h3 class="font-semibold mt-4">7. Start tunnel</h3>
<pre class="bg-gray-900 text-gray-100 p-4 rounded-md text-sm whitespace-pre">
sudo minikube tunnel
</pre>

<h3 class="font-semibold mt-4">8. Map demo.local</h3>
<pre class="bg-gray-900 text-gray-100 p-4 rounded-md text-sm whitespace-pre">
127.0.0.1 demo.local
</pre>

<h3 class="font-semibold mt-4">9. Load generation for autoscaling</h3>
<pre class="bg-gray-900 text-gray-100 p-4 rounded-md text-sm whitespace-pre">
kubectl run loadgen -n scalable-demo --image=busybox --restart=Never -- \\
  sh -c "while true; do wget -qO- http://backend-service:4000/api/compute; done"
</pre>

<h3 class="font-semibold mt-4">10. Cloudflare Worker deploy</h3>
<pre class="bg-gray-900 text-gray-100 p-4 rounded-md text-sm whitespace-pre">
wrangler dev
wrangler deploy
</pre>
`,
  },

  {
    id: "frontend",
    title: "7. Building Your Frontend",
    content: `
<p class="leading-relaxed">
Your frontend should demonstrate how your application uses the backend and allow students to verify 
performance improvements. Any JS framework works; React is commonly used due to tooling and ecosystem.
</p>

<p class="leading-relaxed mt-2">
The frontend must:
</p>
<ul class="list-disc ml-6 leading-relaxed">
  <li>Call backend endpoints such as /api/hello or /api/slow</li>
  <li>Display latency and results</li>
  <li>Show cache status using X-Cache headers</li>
  <li>Be built into a static bundle for NGINX</li>
</ul>

<p class="leading-relaxed mt-2">
Example component pattern (not full code):
</p>

<pre class="bg-gray-900 text-gray-100 p-4 rounded-md text-sm whitespace-pre">
function ExampleCall() {
  const [output, setOutput] = useState(null);

  async function callAPI() {
    const res = await fetch("/api/hello");
    setOutput(await res.json());
  }

  return <button onClick={callAPI}>Call API</button>;
}
</pre>
`,
  },

  {
    id: "backend",
    title: "8. Building Your Backend",
    content: `
<p class="leading-relaxed">
Your backend must expose at least one slow endpoint to demonstrate caching performance improvements
and one CPU-intensive endpoint to demonstrate autoscaling. Below is an <strong>example pattern</strong>:
</p>

<pre class="bg-gray-900 text-gray-100 p-4 rounded-md text-sm whitespace-pre">
GET /api/slow     - artificial delay for caching tests
GET /api/compute  - heavy math loop for autoscaling load
</pre>

<p class="leading-relaxed mt-4">
Example slow endpoint:
</p>

<pre class="bg-gray-900 text-gray-100 p-4 rounded-md text-sm whitespace-pre">
await new Promise(r => setTimeout(r, 3000));
res.set("Cache-Control", "public, max-age=60");
res.json({ msg: "Slow response", ts: Date.now() });
</pre>

<p class="leading-relaxed mt-4">
Do not copy this code directly; implement your own original logic in your project repository.
</p>
`,
  },

  {
    id: "containerization",
    title: "9. Containerization",
    content: `
<p class="leading-relaxed">
Both backend and frontend must be containerized using Docker. Use multi-stage builds where applicable.
</p>

<h3 class="font-semibold mt-4">Example backend Dockerfile:</h3>

<pre class="bg-gray-900 text-gray-100 p-4 rounded-md text-sm whitespace-pre">
FROM node:18-alpine
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE 4000
CMD ["node", "index.js"]
</pre>

<h3 class="font-semibold mt-4">Example frontend Dockerfile:</h3>

<pre class="bg-gray-900 text-gray-100 p-4 rounded-md text-sm whitespace-pre">
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
</pre>

<p class="leading-relaxed mt-4">
These Dockerfiles serve as guidance. You must implement your own Dockerfiles in your demo.
</p>
`,
  },

  {
    id: "k8s-local",
    title: "10. Deploying to Kubernetes (Local)",
    content: `
<p class="leading-relaxed">
Local Kubernetes deployment allows rapid validation of your manifests before deploying to the cloud.
</p>

<ol class="list-decimal ml-6 leading-relaxed">
  <li>Start Minikube with CPU/memory sufficient for HPA.</li>
  <li>Enable Ingress and metrics-server addons.</li>
  <li>Load your Docker images using the Minikube Docker environment.</li>
  <li>Apply namespace, deployment, service, and ingress manifests.</li>
  <li>Verify pods via <code>kubectl get pods</code> and logs.</li>
  <li>Access the app using <code>demo.local</code>.</li>
</ol>

<p class="leading-relaxed mt-4">
Example deployment snippet:
</p>

<pre class="bg-gray-900 text-gray-100 p-4 rounded-md text-sm whitespace-pre">
apiVersion: apps/v1
kind: Deployment
spec:
  replicas: 2
  template:
    spec:
      containers:
        - name: backend
          image: scalable-backend:latest
</pre>
`,
  },

  {
    id: "ingress",
    title: "11. Ingress Routing",
    content: `
<p class="leading-relaxed">
Ingress maps requests from external clients to the correct Kubernetes services.
</p>

<pre class="bg-gray-900 text-gray-100 p-4 rounded-md text-sm whitespace-pre">
/        → frontend-service
/api/*   → backend-service
</pre>

<p class="leading-relaxed mt-2">Example manifest:</p>

<pre class="bg-gray-900 text-gray-100 p-4 rounded-md text-sm whitespace-pre">
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: demo-ingress
spec:
  rules:
  - host: demo.local
    http:
      paths:
        - path: /
          pathType: Prefix
          backend:
            service:
              name: frontend-service
              port:
                number: 80
        - path: /api
          pathType: Prefix
          backend:
            service:
              name: backend-service
              port:
                number: 4000
</pre>
`,
  },

  {
    id: "hpa",
    title: "12. Autoscaling (HPA)",
    content: `
<p class="leading-relaxed">
HPA introduces elastic scaling into your system. CPU or memory spikes automatically increase pod replicas.
</p>

<h3 class="font-semibold mt-4">Example HPA</h3>

<pre class="bg-gray-900 text-gray-100 p-4 rounded-md text-sm whitespace-pre">
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
spec:
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          averageUtilization: 50
</pre>

<p class="leading-relaxed mt-4">
Generate load using:
</p>

<pre class="bg-gray-900 text-gray-100 p-4 rounded-md text-sm whitespace-pre">
kubectl run loadgen -n scalable-demo --image=busybox --restart=Never -- \\
  sh -c "while true; do wget -qO- http://backend-service:4000/api/compute; done"
</pre>
`,
  },

  {
    id: "cloudflare",
    title: "13. Edge Caching with Cloudflare Workers",
    content: `
<p class="leading-relaxed">
Edge caching dramatically improves performance by serving repeated responses directly from Cloudflare's 
nearest POP. Workers allow custom caching strategies at the edge.
</p>

<h3 class="font-semibold mt-4">Typical Worker Logic</h3>
<pre class="bg-gray-900 text-gray-100 p-4 rounded-md text-sm whitespace-pre">
If request in edge cache:
    return cached response (X-Cache: HIT)
Else:
    fetch from origin
    store in cache
    return (X-Cache: MISS)
</pre>

<p class="leading-relaxed mt-4">
You must write your own Worker implementation in your demo repo.
</p>
`,
  },

  {
    id: "analysis",
    title: "14. Analytical Component",
    content: `
<p class="leading-relaxed">
SER598 requires an analytical opinion supported by evidence. Below is our synthesized argument.
</p>

<h3 class="font-semibold mt-4">Pros</h3>
<ul class="list-disc ml-6 leading-relaxed">
  <li>Edge caching reduces latency by up to 60x in slow-endpoint scenarios.</li>
  <li>Kubernetes autoscaling ensures resilience under unpredictable load.</li>
  <li>Containerization improves portability and reproducibility.</li>
  <li>Ingress consolidates front/back routing under a single hostname.</li>
</ul>

<h3 class="font-semibold mt-4">Cons</h3>
<ul class="list-disc ml-6 leading-relaxed">
  <li>Complex operational overhead (networking, security, IAM).</li>
  <li>Higher cloud costs, especially for ALB, EKS control plane, and CDN usage.</li>
  <li>Debugging distributed traffic requires strong observability.</li>
</ul>

<h3 class="font-semibold mt-4">Conclusion</h3>
<p class="leading-relaxed">
For medium-to-large applications, Kubernetes + CDN + edge compute is a strong, future-proof architecture. 
For small apps, serverless or managed hosting may be more cost-effective.
</p>
`,
  },

  {
    id: "exercises",
    title: "15. Hands-On Exercises",
    content: `
<h3 class="font-semibold mt-4">Exercise 1 — Implement Backend + Frontend</h3>
<p>Create your own backend + frontend and containerize both.</p>

<h3 class="font-semibold mt-4">Exercise 2 — Deploy to Minikube</h3>
<p>Deploy your images, manifests, and ingress locally.</p>

<h3 class="font-semibold mt-4">Exercise 3 — Autoscaling</h3>
<p>Load test your backend and measure scale up/down behavior.</p>

<h3 class="font-semibold mt-4">Exercise 4 — Caching</h3>
<p>Measure Cloudflare Worker HIT/MISS performance improvements.</p>

<h3 class="font-semibold mt-4">Exercise 5 — Analysis</h3>
<p>Complete cost, performance, and security analysis.</p>
`,
  },

  {
    id: "references",
    title: "16. References & Resources",
    content: `
<ul class="list-disc ml-6 leading-relaxed">

  <li>
    <a href="https://kubernetes.io/docs" target="_blank" class="text-indigo-600 hover:underline">
      Kubernetes Official Documentation
    </a>
  </li>

  <li>
    <a href="https://developers.cloudflare.com/workers" target="_blank" class="text-indigo-600 hover:underline">
      Cloudflare Workers Documentation
    </a>
  </li>

  <li>
    <a href="https://docs.aws.amazon.com/eks" target="_blank" class="text-indigo-600 hover:underline">
      AWS EKS Documentation
    </a>
  </li>

  <li>
    <a href="https://docs.docker.com" target="_blank" class="text-indigo-600 hover:underline">
      Docker Official Documentation
    </a>
  </li>

  <li>
    <a href="https://opencontainers.org" target="_blank" class="text-indigo-600 hover:underline">
      Open Container Initiative (OCI)
    </a>
  </li>

  <li>
    <a href="https://prometheus.io/docs/" target="_blank" class="text-indigo-600 hover:underline">
      Prometheus Documentation
    </a>
  </li>

  <li>
    <a href="https://www.cncf.io/reports/" target="_blank" class="text-indigo-600 hover:underline">
      CNCF Annual Surveys & Industry Reports
    </a>
  </li>

  <li>
    <a href="https://www.datadoghq.com/container-report/" target="_blank" class="text-indigo-600 hover:underline">
      Datadog Container Report
    </a>
  </li>

</ul>

<p class="leading-relaxed mt-4">
Learners should refer to these resources for deeper study and cite them appropriately in analytical write-ups.
</p>
`
  },


  {
    id: "summary",
    title: "17. Summary",
    content: `
<p class="leading-relaxed">
This tutorial provided a complete walkthrough of performant and scalable web application deployment. 
You learned the foundations of cloud-native development: containerization, orchestration, autoscaling,
CDN optimization, and edge caching. These concepts are used widely across modern engineering teams.
</p>

<p class="leading-relaxed mt-4">
This React-based tutorial webpage now serves as a complete reference for your SER598 project submission.
</p>

<p class="leading-relaxed mt-4 font-semibold">
Group3 — Performant & Scalable Deployment | Fall 2025
</p>
`,
  },
];

export default function App() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow p-6 border-b sticky top-0 z-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Group3 — Performant & Scalable Deployment</h1>
          <p className="text-gray-600">SER598 Advanced Web Project — Fall 2025</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto flex gap-8 py-10 px-4">

        {/* Sidebar */}
        <aside className="w-64 hidden lg:block sticky top-28 self-start">
          <div className="bg-white border shadow-sm rounded-lg p-4">
            <h3 className="font-semibold mb-3">Contents</h3>
            <ul className="space-y-2 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => scrollTo(s.id)}
                    className="text-left text-indigo-600 hover:text-indigo-800"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-12">
          {sections.map((s) => (
            <article
              id={s.id}
              key={s.id}
              className="bg-white border shadow-sm rounded-lg p-8 prose prose-indigo max-w-none scroll-mt-28"
              dangerouslySetInnerHTML={{
                __html: `<h2>${s.title}</h2>${s.content}`,
              }}
            />
          ))}

          <footer className="text-center text-sm text-gray-500 mt-12">
            Group3 — SER598 Advanced Web Project | Fall 2025
          </footer>
        </main>
      </div>
    </div>
  );
}
