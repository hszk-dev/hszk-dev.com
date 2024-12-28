resource "google_cloud_run_v2_service" "frontend" {
  name = "frontend"
  location = "asia-northeast1"
  ingress = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = "gcr.io/hszk-dev-com/frontend:0.1.0"
      ports {
        container_port = 3000
      }
    }
  }
}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = ["allUsers"]
  }
}

resource "google_cloud_run_v2_service_iam_policy" "policy" {
  location = "asia-northeast1"
  name = google_cloud_run_v2_service.frontend.name
  policy_data = data.google_iam_policy.noauth.policy_data
}