#!/usr/bin/env bash

# Kiểm tra nếu có TAILSCALE_AUTHKEY thì tiến hành kết nối
if [ -n "$TAILSCALE_AUTHKEY" ]; then
  echo "Dang ket noi Tailscale..."
  sudo tailscaled --state=/var/lib/tailscale/tailscaled.state --socket=/var/run/tailscale/tailscaled.sock >/dev/null 2>&1 &
  sleep 2
  sudo -E tailscale up --authkey="${TAILSCALE_AUTHKEY}" --hostname="codespace-nuxt-vps"
  echo "Tailscale da ket noi thanh cong!"
else
  echo "Canh bao: Khong tim thay TAILSCALE_AUTHKEY trong Secrets!"
fi
