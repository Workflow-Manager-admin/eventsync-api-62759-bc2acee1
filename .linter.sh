#!/bin/bash
cd /home/kavia/workspace/code-generation/eventsync-api-62759-bc2acee1/event_manager_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

