import React from "react";

const sections = [
  {
    id: "intro",
    title: "1. Introduction",
    content: `
<p class="leading-relaxed">
Modern web applications often support users across regions, networks, and device types. They must be 
fast, reliable, scalable, and resilient to workload fluctuations. Traditional monolithic deployments 
struggle to meet these expectations. Cloud-native patterns - such as containerization, microservices, 
Kubernetes orchestration, CDN acceleration, and edge compute - enable systems to achieve global 
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
    id: "core-concepts",
    title: "3. Core Concepts",
    content: `
<p class="leading-relaxed">
Before exploring scalable deployment techniques such as Kubernetes, CDNs, edge computing, and autoscaling,
it is essential to understand several foundational concepts that form the backbone of modern cloud-native systems.
These concepts-indirection, virtualization, containerization, orchestration, and content distribution-help us
see why today's architectures work the way they do.
</p>

<hr class="my-6"/>

<h3 class="font-semibold text-lg">Layer of Indirection</h3>

<p class="leading-relaxed">
A <strong>layer of indirection</strong> is introduced between two existing system components when a problem 
cannot be solved through direct interaction. Instead of A communicating directly with B, an interaction 
layer is inserted between them, allowing additional functionality without modifying the original components.
</p>

<p class="leading-relaxed mt-2">
Examples in modern systems:
</p>

<ul class="list-disc ml-6 leading-relaxed">
  <li>Hypervisors → Indirection between hardware and OS.</li>
  <li>Container runtimes → Indirection between OS and applications.</li>
  <li>Kubernetes control plane → Indirection between developers and running workloads.</li>
  <li>CDNs → Indirection between clients and origin servers.</li>
</ul>

<p class="leading-relaxed mt-2">
Indirection increases flexibility, scalability, security, and performance while minimizing changes
to existing components.
</p>

<hr class="my-6"/>

<h3 class="font-semibold text-lg">🖥️ Virtual Machines (VMs)</h3>

<img 
  src="https://media.geeksforgeeks.org/wp-content/uploads/20250823130235313168/virtual_machines.webp"
  alt="Virtual Machine Diagram"
  class="rounded-md shadow mb-4"
/>

<p class="leading-relaxed">
Virtual Machines (VMs) allow multiple “virtual computers” to run on a single physical system.  
Each VM behaves as a fully independent computer with its own:
</p>

<ul class="list-disc ml-6 leading-relaxed">
  <li>Virtual CPU</li>
  <li>Virtual memory</li>
  <li>Virtual storage</li>
  <li>Guest operating system</li>
</ul>

<p class="leading-relaxed mt-2">
By using a <strong>hypervisor</strong>-the layer of indirection above the host OS-multiple VMs can share underlying
hardware resources. Hypervisors ensure isolation so that one VM cannot directly interfere with another.
</p>

<p class="leading-relaxed mt-2">
Examples of VM platforms:
</p>
<ul class="list-disc ml-6 leading-relaxed">
  <li>VirtualBox</li>
  <li>VMware</li>
  <li>Hyper-V</li>
  <li>AWS EC2 virtual machines</li>
</ul>

<p class="leading-relaxed mt-2">
<strong>Benefits:</strong> Strong isolation, multiple OS environments, secure multi-tenancy.<br/>
<strong>Drawback:</strong> Resource-heavy. Each VM loads a full guest operating system, resulting in slow startup times and higher RAM/CPU usage.
</p>

<hr class="my-6"/>

<h3 class="font-semibold text-lg">📦 Containers</h3>

<img 
  src="https://www.docker.com/app/uploads/2021/11/container-what-is-container.png"
  alt="Container Diagram"
  class="rounded-md shadow mb-4"
/>

<p class="leading-relaxed">
Containers offer a lightweight alternative to virtual machines. A container packages:
</p>

<ul class="list-disc ml-6 leading-relaxed">
  <li>Application code</li>
  <li>Runtime</li>
  <li>Libraries and dependencies</li>
</ul>

<p class="leading-relaxed mt-2">
Unlike VMs, <strong>containers do not include a full guest OS</strong>. Instead, they share the host operating system's 
kernel using a container runtime (e.g., Docker, containerd). This leads to:
</p>

<ul class="list-disc ml-6 leading-relaxed">
  <li>Faster startup times (milliseconds)</li>
  <li>Lower resource usage</li>
  <li>High density-run many containers on one machine</li>
  <li>Easy portability across environments</li>
</ul>

<p class="leading-relaxed mt-2">
Downside: Containers do not provide as strong isolation as VMs since they share the host kernel.
However, for most cloud workloads, the tradeoff is acceptable and desirable for performance reasons.
</p>

<hr class="my-6"/>

<h3 class="font-semibold text-lg">🎼 Orchestration</h3>

<img 
  src="https://orkes.io/images/blogs/2024-08-23-what-is-orchestration/What-Is-Orchestration-Ochestration-Layer.jpg"
  alt="Orchestration Layer Diagram"
  class="rounded-md shadow mb-4"
/>

<p class="leading-relaxed">
Orchestration is the coordination of distributed components into automated, repeatable, reliable processes.  
An <strong>orchestrator</strong> acts as the central intelligence layer that ensures multiple services work together 
toward an end goal.
</p>

<p class="leading-relaxed mt-2">
Orchestration platforms manage:
</p>

<ul class="list-disc ml-6 leading-relaxed">
  <li>Microservice workflows</li>
  <li>Autoscaling and placement of workloads</li>
  <li>Health checks and restarts</li>
  <li>Rolling deployments and rollbacks</li>
  <li>Interactions between APIs, databases, event systems, LLM models, and external services</li>
</ul>

<p class="leading-relaxed mt-2">
Kubernetes is the most widely used orchestrator for containerized workloads.  
Other orchestration systems include:
</p>

<ul class="list-disc ml-6 leading-relaxed">
  <li>Apache Airflow - data pipeline orchestration</li>
  <li>Temporal / Netflix Conductor - workflow orchestration</li>
  <li>AWS Step Functions - serverless orchestration</li>
</ul>

<p class="leading-relaxed mt-2">
Modern distributed systems are too large and complex to manage manually, making orchestration foundational 
to scalable cloud deployments.
</p>

<hr class="my-6"/>

<h3 class="font-semibold text-lg">🌍 Content Delivery Networks (CDNs)</h3>

<img 
  src="https://zd-brightspot.s3.us-east-1.amazonaws.com/wp-content/uploads/2021/08/25131051/Content-Delivery-Network.png"
  alt="CDN Diagram"
  class="rounded-md shadow mb-4"
/>

<p class="leading-relaxed">
A <strong>Content Delivery Network (CDN)</strong> is a globally distributed network of servers designed to minimize latency 
by serving content from the geographically closest location to the user. CDNs significantly improve load times, 
reduce bandwidth consumption, and decrease the load on origin servers.
</p>

<p class="leading-relaxed mt-2">
CDNs are typically used to deliver:
</p>

<ul class="list-disc ml-6 leading-relaxed">
  <li>Images and videos</li>
  <li>JavaScript and CSS</li>
  <li>HTML documents</li>
  <li>APIs (with caching)</li>
  <li>Static website assets</li>
</ul>

<h3 class="font-semibold mt-4">📡 CDN Architecture</h3>

<p class="leading-relaxed">
Modern CDN architecture commonly includes three layers:
</p>

<ul class="list-disc ml-6 leading-relaxed">
  <li>
    <strong>Origin Server</strong> - The ultimate source of truth (e.g., application server, storage bucket).
  </li>

  <li>
    <strong>Regional Edge Caches (RECs)</strong> - Mid-tier caches in strategic regions that reduce load on the origin
    by serving multiple edge locations. They improve cache hit ratios across continents.
  </li>

  <li>
    <strong>Edge Locations (Points of Presence)</strong> - Globally distributed servers (50–300+ per provider) that deliver 
    content directly to users with minimal latency.
  </li>
</ul>

<p class="leading-relaxed mt-2">
A CDN request flow typically works as follows:
</p>

<pre class="bg-gray-900 text-gray-100 p-4 rounded-md text-sm whitespace-pre overflow-auto">
User → Nearest Edge Location → (Optional: REC) → Origin Server
</pre>

<p class="leading-relaxed mt-2">
If the content is cached at the edge → <strong>HIT</strong> → returned immediately.  
If not → <strong>MISS</strong> → pulled from the origin → cached locally → returned to the user.
</p>

<p class="leading-relaxed mt-4 font-semibold">
Together, these foundational concepts set the stage for Kubernetes, cloud scaling, CDNs, and edge compute - 
all of which are essential components of performant, scalable deployments in modern cloud architectures.
</p>
`
  },


  {
    id: "background",
    title: "4. History",
    content: `
<p class="leading-relaxed">
Scalable and performant deployment architectures emerged gradually over several decades, driven by 
advances in operating systems, distributed systems, virtualization, networking, and cloud computing. 
Below is a historically accurate timeline capturing the key milestones that shaped today's 
cloud-native, containerized, and edge-accelerated world.
</p>

<h3 class="font-semibold mt-4">📜 Timeline of Key Milestones</h3>

<ul class="list-disc ml-6 leading-relaxed">

  <li>
    <strong>1979 - Unix V7 Introduces chroot</strong><br/>
    The first form of process isolation. Applications could be restricted to a specific filesystem view.  
    This primitive concept eventually influenced container isolation.
  </li>

  <li>
    <strong>1998 - Akamai Introduces the CDN</strong><br/>
    Akamai pioneered Content Delivery Networks, caching static assets geographically close to users, 
    reducing latency and offloading origin servers.
  </li>

  <li>
    <strong>2003–2004 - Google Creates Borg</strong><br/>
    Borg was Google’s internal cluster manager used to run thousands of services and batch jobs across 
    large datacenters. Borg introduced concepts like declarative configuration and self-healing that 
    later shaped Kubernetes.
  </li>

  <li>
    <strong>2006 - AWS Launches EC2</strong><br/>
    Amazon made on-demand compute accessible at scale.  
    This shifted the industry away from purchasing physical servers to renting compute capacity.
  </li>

  <li>
    <strong>2000–2008 - OS-Level Virtualization Advances</strong><br/>
    • FreeBSD Jails (2000) offered isolated userspace partitions.<br/>
    • Linux Containers (LXC, 2008) introduced kernel-level isolation using namespaces and cgroups.<br/>
    These innovations paved the way for modern containers.
  </li>

  <li>
    <strong>2011 - NIST Defines Cloud Computing (SP 800-145)</strong><br/>
    The National Institute of Standards and Technology formalized widely-adopted cloud principles such as:<br/>
    On-demand self-service, Broad network access, Resource pooling, Rapid elasticity, and Measured service.
  </li>

  <li>
    <strong>2013 - Docker Popularizes Containers</strong><br/>
    Docker introduced easy-to-use tooling and a standard image format.  
    Containers became portable, reproducible, and developer-friendly, revolutionizing DevOps.
  </li>

  <li>
    <strong>2014 - Kubernetes is Open-Sourced</strong><br/>
    Google released Kubernetes to the public, based on lessons from Borg.  
    Kubernetes automated deployment, scaling, and management of containers, becoming the global standard.
  </li>

  <li>
    <strong>2015 - OCI (Open Container Initiative) is Formed</strong><br/>
    The Linux Foundation established OCI to prevent fragmentation in container technology.<br/>
    They defined:<br/>
    • OCI Image Specification<br/>
    • OCI Runtime Specification
    These standards guarantee portability across container runtimes.
  </li>

  <li>
    <strong>2015 - CNCF (Cloud Native Computing Foundation) is Created</strong><br/>
    CNCF governs Kubernetes and ensures its vendor-neutral ecosystem.  
    Certified Kubernetes Conformance guarantees Kubernetes behaves the same across AWS, Azure, and GCP.
  </li>

  <li>
    <strong>2015 - HTTP/2 (RFC 7540) Published</strong><br/>
    Introduced multiplexing: multiple requests over a single TCP connection.<br/>
    Reduced latency significantly for web applications.
  </li>

  <li>
    <strong>2022 - HTTP/3 (RFC 9114) Published</strong><br/>
    Built on QUIC (UDP-based), enabling resilient and faster performance even on unreliable networks.  
    HTTP/3 removes head-of-line blocking, further improving global web performance.
  </li>

</ul>

<h3 class="font-semibold mt-6">Summary</h3>
<p class="leading-relaxed">
From OS-level isolation in the 1970s to edge compute and QUIC-based protocols today, the evolution of 
scalable and performant deployment technologies has been steadily shaped by the needs of global 
applications. Containers, Kubernetes, CDNs, edge compute, and autoscaling are the culmination of decades 
of work - and they continue to evolve rapidly as demand grows.
</p>
`
  },


  {
    id: "architecture",
    title: "5. System Architecture Overview",
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
    title: "6. Our Project Structure (Recommended Example)",
    content: `
<p class="leading-relaxed">
Below is <strong>the structure our team used</strong> for the project demo.  
This is not required for your own implementation - it simply illustrates how we organized 
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
    title: "7. Build, Run & Deployment Commands (Our Demo Workflow)",
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
    title: "8. Building Your Frontend",
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
    title: "9. Building Your Backend",
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
    title: "10. Containerization",
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
    title: "11. Deploying to Kubernetes (Local)",
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
    title: "12. Ingress Routing",
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
    title: "13. Autoscaling (HPA)",
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
    title: "14. Edge Caching with Cloudflare Workers",
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
    title: "15. Analytical Component",
    content: `
<p class="leading-relaxed">
Today's modern internet would not exist in its current form without Content Delivery Networks (CDNs). 
Over the last decade, CDNs have transformed from an optional optimization layer into mission-critical 
infrastructure that powers nearly everything users interact with - social media feeds, streaming platforms, 
e-commerce storefronts, gaming networks, and global SaaS products. 
</p>

<p class="leading-relaxed mt-4">
However, this dependency introduces powerful advantages <em>and</em> systemic risks. 
Below is our team’s evidence-based analysis of why CDNs are essential, why they can be dangerous, 
and what the future holds as CDNs evolve into full edge-compute platforms.
</p>

<hr class="my-6"/>

<h3 class="font-semibold text-lg">🌍 The Good: CDNs Enable the Global Internet</h3>

<p class="leading-relaxed">
Modern users expect websites to load instantly - ideally under 2 seconds. Without CDNs, this expectation 
would be impossible to meet. Google’s research indicates that <strong>53% of mobile users abandon a site 
that takes longer than 3 seconds to load</strong>. Traditional origin servers simply cannot deliver this level 
of performance to users worldwide.
</p>

<p class="leading-relaxed mt-4">
A user in Tokyo accessing a server in Virginia experiences ~200ms round-trip latency. With a CDN, that 
same user receives content from an edge server <strong>located in Tokyo at 20–50ms latency</strong>. 
This 4×–10× improvement is not a luxury - it is a business necessity.
</p>

<p class="leading-relaxed mt-4">
Amazon famously observed that <strong>every 100ms of latency costs 1% of sales revenue</strong>.  
At global scale, milliseconds have million-dollar consequences.
</p>

<p class="leading-relaxed mt-4">
Streaming platforms rely even more heavily on CDNs. For example, 
<strong>Netflix delivers more than 250 million hours of content per day</strong>, enabled by their Open Connect 
CDN, which distributes servers directly inside ISP networks. Without CDNs, global 4K and HDR video 
streaming simply would not be possible - internet backbones would collapse under the load.
</p>

<hr class="my-6"/>

<h3 class="font-semibold text-lg">⚠️ The Bad: CDNs Create Single Points of Failure</h3>

<p class="leading-relaxed">
While CDNs speed up the internet, they also introduce systemic risk because a small number of providers 
carry a disproportionate share of global traffic. When they fail, the internet fails.
</p>

<p class="leading-relaxed mt-4">
This risk materialized dramatically on <strong>June 8, 2021</strong>, when 
<strong>Fastly - one of the world’s largest CDN providers - experienced a configuration bug</strong> that 
took down its entire global network for 49 minutes.
</p>

<p class="leading-relaxed">
During this outage:
</p>

<ul class="list-disc ml-6 leading-relaxed">
  <li>Amazon</li>
  <li>Reddit</li>
  <li>GitHub</li>
  <li>Spotify</li>
  <li>CNN & major news outlets</li>
  <li>Government portals</li>
  <li>Hundreds of enterprise SaaS platforms</li>
</ul>

<p class="leading-relaxed mt-4">
All went offline simultaneously.
</p>

<p class="leading-relaxed mt-4">
This outage, lasting less than an hour, caused an estimated <strong>$100 million in losses</strong> and provided 
a sobering realization:  
</p>

<p class="leading-relaxed font-semibold text-red-700 mt-2">
“The modern internet depends on only a handful of CDN providers - and if one breaks, huge portions of 
the internet break with it.”
</p>

<p class="leading-relaxed mt-4">
This is a classic case of <strong>centralized infrastructure risk</strong>: efficiency improves, but fragility increases.
</p>

<hr class="my-6"/>

<h3 class="font-semibold text-lg">🔮 Future Outlook: Smarter Edges, Deeper Dependencies</h3>

<p class="leading-relaxed">
CDNs are evolving beyond caching. They now provide:
</p>

<ul class="list-disc ml-6 leading-relaxed">
  <li>Edge compute (Cloudflare Workers, Fastly Compute@Edge)</li>
  <li>Dynamic request shaping and routing</li>
  <li>Security filtering and bot mitigation</li>
  <li>Real-time personalization and A/B testing</li>
</ul>

<p class="leading-relaxed mt-4">
As applications increasingly require <strong>low-latency, real-time interactions</strong> - 
IoT, 5G, multiplayer gaming, augmented reality - CDN edge compute will become an even more fundamental 
part of system architecture.
</p>

<p class="leading-relaxed mt-4">
Cisco forecasts that <strong>82% of all internet traffic will be video by 2025</strong>, 
meaning reliance on CDN infrastructure will grow dramatically. But with this growth comes increased 
concentration of power and increased vulnerability to catastrophic outages.
</p>

<p class="leading-relaxed mt-4">
The emerging mitigation strategy is <strong>multi-CDN architectures</strong>, where companies distribute traffic 
across multiple providers. However, these architectures introduce:
</p>

<ul class="list-disc ml-6 leading-relaxed">
  <li>Higher cost</li>
  <li>More complex routing logic</li>
  <li>More operational overhead</li>
</ul>

<p class="leading-relaxed mt-4">
Whether this tradeoff is sustainable remains an open question.
</p>

<hr class="my-6"/>

<h3 class="font-semibold text-lg">📝 Our Verdict</h3>

<p class="leading-relaxed">
CDNs are no longer optional - they are <strong>irreplaceable infrastructure</strong> enabling the speed, scale, 
and reliability the modern internet demands. They provide huge performance improvements, global reach, 
cost savings, and support for massive workloads. Without CDNs, global-scale applications like Netflix, 
Amazon, YouTube, Cloudflare-protected APIs, or global SaaS platforms could not exist.
</p>

<p class="leading-relaxed mt-4">
But this power comes with risk.
</p>

<p class="leading-relaxed mt-4 font-semibold">
Our analysis shows that CDNs create a structural dependency - and when even one major provider fails, 
large portions of the internet go dark.
</p>

<p class="leading-relaxed mt-4">
As CDNs evolve into distributed edge computing platforms, the internet becomes:
</p>

<ul class="list-disc ml-6 leading-relaxed">
  <li>Faster</li>
  <li>More efficient</li>
  <li>More capable</li>
  <li>But also more fragile</li>
</ul>

<p class="leading-relaxed mt-4">
To ensure a resilient internet, organizations must strengthen redundancy strategies, adopt multi-provider 
architectures when feasible, and build failure-tolerant systems.
</p>

<p class="leading-relaxed mt-6 font-semibold">
CDNs are essential - but the industry must mitigate the risks that come with such concentrated dependency.
</p>
`
  },

  {
    id: "exercises",
    title: "16. Hands-On Exercises",
    content: `
<h3 class="font-semibold mt-4">Exercise 1 - Implement Backend + Frontend</h3>
<p>Create your own backend + frontend and containerize both.</p>

<h3 class="font-semibold mt-4">Exercise 2 - Deploy to Minikube</h3>
<p>Deploy your images, manifests, and ingress locally.</p>

<h3 class="font-semibold mt-4">Exercise 3 - Autoscaling</h3>
<p>Load test your backend and measure scale up/down behavior.</p>

<h3 class="font-semibold mt-4">Exercise 4 - Caching</h3>
<p>Measure Cloudflare Worker HIT/MISS performance improvements.</p>

<h3 class="font-semibold mt-4">Exercise 5 - Analysis</h3>
<p>Complete cost, performance, and security analysis.</p>
`,
  },

  {
    id: "references",
    title: "17. References & Resources",
    content: `
<p class="leading-relaxed mb-4">
The following references support the historical, technical, and analytical content presented in this tutorial.
All academic citations follow APA-style formatting where applicable.
</p>

<ol class="list-decimal ml-6 leading-relaxed space-y-2">

  <li>
    Zhao, M. (2025). <em>Cloud Computing: A Bottom-up Approach</em>. Ming Zhao.
  </li>

  <li>
    GeeksforGeeks. “Virtual Machines in Operating Systems.”  
    <a href="https://www.geeksforgeeks.org/operating-systems/virtual-machines-in-operating-system/" 
       target="_blank" class="text-indigo-600 hover:underline">
       https://www.geeksforgeeks.org/operating-systems/virtual-machines-in-operating-system/
    </a>
  </li>

  <li>
    Docker Inc. “What Is a Container?”  
    <a href="https://www.docker.com/resources/what-container/" 
       target="_blank" class="text-indigo-600 hover:underline">
       https://www.docker.com/resources/what-container/
    </a>
  </li>

  <li>
    Orkes. “What Is Orchestration?”  
    <a href="https://orkes.io/blog/what-is-orchestration/" 
       target="_blank" class="text-indigo-600 hover:underline">
       https://orkes.io/blog/what-is-orchestration/
    </a>
  </li>

  <li>
    Nygren, E., Sitaraman, R. K., & Sun, J. (2010).  
    “The Akamai Network: A Platform for High-Performance Internet Applications.”  
    <em>ACM SIGOPS Operating Systems Review</em>.
  </li>

  <li>
    Pathan, M., & Buyya, R. (2008).  
    “A Taxonomy of CDNs.” In <em>Content Delivery Networks</em>. Springer.
  </li>

  <li>
    Spiceworks. “What Is a Content Delivery Network (CDN)?”  
    <a href="https://www.spiceworks.com/tech/networking/articles/what-is-content-delivery-network/" 
       target="_blank" class="text-indigo-600 hover:underline">
       https://www.spiceworks.com/tech/networking/articles/what-is-content-delivery-network/
    </a>
  </li>

  <li>
    Open Container Initiative (OCI). (2015).  
    <em>OCI Image and Runtime Specifications</em>. Linux Foundation.
  </li>

  <li>
    Berners-Lee, T., et al. (2015).  
    <em>Hypertext Transfer Protocol Version 2 (HTTP/2)</em>. IETF RFC 7540.
  </li>

  <li>
    Aqua Security. (2025).  
    “A Brief History of Containers: From 1970s chroot to Docker.”
  </li>

  <li>
    Think with Google. (2018).  
    “The Need for Mobile Speed: How Mobile Latency Impacts Publisher Revenue.”  
    <a href="https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/"
       target="_blank" class="text-indigo-600 hover:underline">
       https://www.thinkwithgoogle.com/...
    </a>
  </li>

  <li>
    Kohavi, R., & Longbotham, R. (2007).  
    “Online Experiments: Lessons Learned.”  
    <em>IEEE Computer</em>, 40(9), 103–105.
  </li>

  <li>
    Netflix Technology Blog.  
    “Open Connect Overview.” (2021).  
    <a href="https://openconnect.netflix.com/" 
       target="_blank" class="text-indigo-600 hover:underline">
       https://openconnect.netflix.com/
    </a>
  </li>

  <li>
    Palmer, A. (2021).  
    “Amazon, Reddit and Twitch Go Down in Major Internet Outage.”  
    <em>CNBC</em>.  
    <a href="https://www.cnbc.com/2021/06/08/fastly-global-internet-outage-affects-amazon-reddit.html" 
       target="_blank" class="text-indigo-600 hover:underline">
        https://www.cnbc.com/2021/06/08/...
    </a>
  </li>

  <li>
    Constantin, L. (2021).  
    “Fastly Outage Highlights Internet's Reliance on Key Infrastructure Providers.”  
    <em>CSO Online</em>.  
    <a href="https://www.csoonline.com/article/3622995/fastly-outage-highlights-internets-reliance-on-a-few-key-infrastructure-providers.html"
       target="_blank" class="text-indigo-600 hover:underline">
       https://www.csoonline.com/...
    </a>
  </li>

  <li>
    Cisco. (2020).  
    “Cisco Annual Internet Report (2018–2023) White Paper.”  
    <a href="https://www.cisco.com/c/en/us/solutions/collateral/executive-perspectives/annual-internet-report/white-paper-c11-741490.html" 
       target="_blank" class="text-indigo-600 hover:underline">
       https://www.cisco.com/...
    </a>
  </li>

</ol>
`
  },
  {
    id: "additional-sources",
    title: "18. Additional Sources",
    content: `
<p class="leading-relaxed mb-4">
The following additional sources provide deeper insights into virtualization, containerization, 
orchestration, CDNs, cloud infrastructure, site reliability engineering, and large-scale distributed systems.
Learners are encouraged to explore these materials for extended understanding beyond this tutorial.
</p>

<ul class="list-disc ml-6 leading-relaxed space-y-2">

  <li>
    Microsoft Azure. “What Is a Virtual Machine?”  
    <a href="https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-virtual-machine"
       target="_blank" class="text-indigo-600 hover:underline">
      https://azure.microsoft.com/.../what-is-a-virtual-machine
    </a>
  </li>

  <li>
    MasterDC. “What Is Containerization? Benefits Explained.”  
    <a href="https://www.masterdc.com/blog/what-is-containerization-benefits-explained/"
       target="_blank" class="text-indigo-600 hover:underline">
      https://www.masterdc.com/.../containerization-benefits
    </a>
  </li>

  <li>
    Red Hat. “What Is Orchestration?”  
    <a href="https://www.redhat.com/en/topics/automation/what-is-orchestration"
       target="_blank" class="text-indigo-600 hover:underline">
      https://www.redhat.com/.../what-is-orchestration
    </a>
  </li>

  <li>
    Cloudflare Learning Center. “What Is a CDN? How Do CDNs Work?”  
    <a href="https://www.cloudflare.com/learning/cdn/what-is-a-cdn/"
       target="_blank" class="text-indigo-600 hover:underline">
      https://www.cloudflare.com/learning/cdn/what-is-a-cdn/
    </a>
  </li>

  <li>
    Amazon Web Services. “How CloudFront Delivers Content.”  
    <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/HowCloudFrontWorks.html"
       target="_blank" class="text-indigo-600 hover:underline">
      https://docs.aws.amazon.com/.../HowCloudFrontWorks
    </a>
  </li>

  <li>
    Wiggins, A. (2011). <em>The Twelve-Factor App</em>.  
    <a href="https://12factor.net"
       target="_blank" class="text-indigo-600 hover:underline">
      https://12factor.net
    </a>
  </li>

  <li>
    Beyer, B., Jones, C., Petoff, J., & Murphy, N. R. (2016).  
    <em>Site Reliability Engineering: How Google Runs Production Systems</em>.  
    O’Reilly Media.  
    <a href="https://sre.google/books/"
       target="_blank" class="text-indigo-600 hover:underline">
      https://sre.google/books/
    </a>
  </li>

  <li>
    Nishtala, R., et al. (2013). “Scaling Memcache at Facebook.”  
    Proceedings of the 10th USENIX Symposium on Networked Systems Design and Implementation (NSDI).  
    <a href="https://www.usenix.org/conference/nsdi13/technical-sessions/presentation/nishtala"
       target="_blank" class="text-indigo-600 hover:underline">
      https://www.usenix.org/.../nishtala
    </a>
  </li>

  <li>
    DeCandia, G., et al. (2007). “Dynamo: Amazon’s Highly Available Key-value Store.”  
    Proceedings of the 21st ACM Symposium on Operating Systems Principles (SOSP).  
    <a href="https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf"
       target="_blank" class="text-indigo-600 hover:underline">
      https://www.allthingsdistributed.com/.../dynamo
    </a>
  </li>

</ul>

<p class="leading-relaxed mt-6">
These additional sources provide advanced context for learners who wish to explore 
cloud-native systems, distributed caching, orchestration frameworks, and SRE principles in depth.
</p>
`
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
          <h1 className="text-2xl font-bold">Group3 - Performant & Scalable Deployment</h1>
          <p className="text-gray-600">SER598 Advanced Web Project - Fall 2025</p>
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
                __html: `<h2><b>${s.title}</b></h2>${s.content}`,
              }}
            />
          ))}

          <footer className="text-center text-sm text-gray-500 mt-12">
            Group3 - SER598 Advanced Web Project | Fall 2025
          </footer>
        </main>
      </div>
    </div>
  );
}
