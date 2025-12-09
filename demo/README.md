# 🌤️ **Weather Performance Platform — Kubernetes + Caching + Autoscaling**

A modern, production-style **Weather Analytics Dashboard** deployed on Kubernetes, showcasing:

* ⚡ **Backend caching for performance acceleration**
* ☁️ **Kubernetes deployments, services & ingress**
* 📈 **Horizontal Pod Autoscaling (HPA)**
* 🚀 **React frontend with a modern, Apple-style UI**
* 🧮 **CPU-intensive weather analysis logic**
* 🔁 **Automatic scaling under load**

This project is designed to look and behave like a real cloud-native weather application while demonstrating advanced infrastructure concepts.

---

# 📦 **Tech Stack**

### **Frontend**

* React (Vite)
* Modern UI with pure CSS (no Tailwind dependency)
* Live weather analysis & history tracking

### **Backend**

* Node.js + Express
* Provider aggregation (simulated external APIs)
* CPU-heavy analysis for HPA testing
* Built-in in-memory caching (HIT/MISS)

### **Infrastructure**

* Kubernetes (Minikube)
* Deployments, Services, Ingress
* Horizontal Pod Autoscaler (HPA)
* NGINX Ingress Controller

---

#  **1. Prerequisites**

Make sure you have installed:

### ✔ Minikube

```
https://minikube.sigs.k8s.io/docs/start/
```

### ✔ kubectl

```
https://kubernetes.io/docs/tasks/tools/
```

### ✔ Docker Desktop

(Used by Minikube’s Docker driver)

### ✔ Node.js (only for local editing)

Backend & frontend build inside Docker, so Node is optional.

---

#  **2. Start Minikube**

Start cluster using Docker driver:

```bash
minikube start --driver=docker
```

Enable required addons:

```bash
minikube addons enable ingress
minikube addons enable metrics-server
```

---

#  **3. Build Backend & Frontend Images (Inside Minikube)**

Your images MUST be built inside Minikube's docker daemon.

Run:

```bash
eval $(minikube docker-env)
```

### Build backend:

```bash
docker build -t demo-backend:latest ./backend
```

### Build frontend:

```bash
docker build -t demo-frontend:latest ./frontend
```

---

#  **4. Deploy Everything to Kubernetes**

Apply all manifests:

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/backend-deployment.yaml -n k8s-demo
kubectl apply -f k8s/backend-service.yaml -n k8s-demo
kubectl apply -f k8s/frontend-deployment.yaml -n k8s-demo
kubectl apply -f k8s/frontend-service.yaml -n k8s-demo
kubectl apply -f k8s/ingress.yaml -n k8s-demo
kubectl apply -f k8s/hpa.yaml -n k8s-demo
```

Verify deployments:

```bash
kubectl get pods -n k8s-demo
```

---

#  **5. Run Minikube Tunnel (Required for Ingress)**

In a **second terminal**, run:

```bash
sudo minikube tunnel
```

Leave this running.

This makes:

```
http://demo.local
```

point to your cluster's ingress controller.

---

#  **6. Add demo.local to /etc/hosts**

Edit hosts file:

```bash
sudo nano /etc/hosts
```

Add:

```
127.0.0.1 demo.local
```

Save and exit.

---

# **7. Access Your Application**

Open browser:

```
http://demo.local
```

You should see your modern Weather Analytics UI.

---

# **8. Testing Backend Caching**

Hit the API:

```bash
curl http://demo.local/api/weather?city=phoenix
```

Then again:

```bash
curl http://demo.local/api/weather?city=phoenix
```

First response → slow
Second response → instant, and includes:

```
"cached": true
```

---

# **9. Testing Autoscaling (HPA)**

Generate load to force scaling:

```bash
kubectl run -n k8s-demo loadgen --image=busybox --restart=Never -- \
  sh -c "while true; do wget -qO- http://express-backend-svc:4000/api/weather?city=phoenix; done"
```

Watch autoscaler:

```bash
kubectl get hpa -n k8s-demo -w
```

You will see replicas increase from 2 → 3 → 4 under load.

Check pods:

```bash
kubectl get pods -n k8s-demo
```

---

# **10. Rebuilding After Code Changes**

### Backend:

```bash
eval $(minikube docker-env)
docker build -t demo-backend:latest ./backend
kubectl rollout restart deployment express-backend -n k8s-demo
```

### Frontend:

```bash
eval $(minikube docker-env)
docker build -t demo-frontend:latest ./frontend
kubectl rollout restart deployment react-frontend -n k8s-demo
```

---

# **11. Cleanup**

```bash
kubectl delete namespace k8s-demo
minikube stop
```