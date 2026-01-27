#!/bin/bash

# Build script untuk Docker/Podman dengan memory limit
# Usage: ./build-docker.sh [memory_limit] [image_name]
# Example: ./build-docker.sh 4g amark-nextjs:latest

set -e

MEMORY_LIMIT=${1:-4g}
IMAGE_NAME=${2:-amark-nextjs:latest}

echo "🔨 Building Docker image with ${MEMORY_LIMIT} memory limit..."
echo "📦 Image name: ${IMAGE_NAME}"
echo ""

# Check if podman or docker is available
if command -v podman &> /dev/null; then
    echo "✅ Using Podman"
    podman build --memory="${MEMORY_LIMIT}" -t "${IMAGE_NAME}" .
elif command -v docker &> /dev/null; then
    echo "✅ Using Docker"
    # Docker doesn't support --memory flag directly, but we can use buildkit
    DOCKER_BUILDKIT=1 docker build -t "${IMAGE_NAME}" .
else
    echo "❌ Error: Neither podman nor docker found"
    exit 1
fi

echo ""
echo "✅ Build completed successfully!"
echo "🚀 To run: docker run -d -p 3000:3000 --name amark-nextjs ${IMAGE_NAME}"
