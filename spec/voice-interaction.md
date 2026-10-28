# Chrome-only voice input and spoken replies

Status: approved specification. Uses only Chrome/browser APIs for recording, recognition, transcription, and playback. No endpoint/cloud speech provider, external speech library, or server audio service. Uses [attachments](attachments.md), [questions](request-user-input.md), [structured input](structured-input-extension.md), and [observability](observability.md).

## Purpose

Offer spoken input and readable replies through Chrome/browser speech APIs while keeping the normal text workflow usable. Mandatory transcript review and capability checks prevent recording from becoming an unreviewed instruction or a hidden cloud route.

## User intent

Choose supported local speech options, explicitly record or dictate, review and send the transcript, and control optional read-aloud playback.

## Agent intent

The agent does not act through this spec to open the microphone, choose a speech provider, or start playback. It receives a reviewed message through the ordinary chat contract; browser-controlled transcription and synthesis remain separate from agent tools.

## Actors and capability choices

Voice is a human-controlled input/output surface, not an agent tool that opens the microphone. The human chooses a language, presses Record/Dictate, reviews text, and explicitly sends it. Replies retain normal text and optionally have Read aloud. Browser availability, microphone permission, installed language packs, Prompt API audio support, and local synthesis voices are separate capabilities. A configured [local text LLM](local-model-endpoint.md) does not receive microphone bytes or replace this Chrome-only speech path.

Input path A is on-device Web Speech recognition when supported: feature-detect SpeechRecognition, processLocally, and its available/install methods. Set processLocally=true before start; check available({langs:[language],processLocally:true}). For downloadable packs offer a user-initiated install and then retry availability. Never set processLocally=false as a fallback, including on prefixed legacy implementations. If local processing cannot be established, this path is unavailable. Model training downloads/language packs may need network installation; recognition after setup must use the declared on-device path.

Input path B records a bounded clip using getUserMedia({audio:true}) and MediaRecorder, then uses a fresh tool-free Chrome LanguageModel session that actually supports audio. It asks only for transcription into `{transcript:string}` with maxLength 4000 through responseConstraint. Declare matching expectedInputs/Outputs in availability/create. One transcription inference, no task executor, no skill/memory retrieval, no main-agent prompt, and no domain mutation. Prompt API audio may be unavailable on a device; detect rather than assume GPU/model support. Transcription errors/hallucinations remain possible, which is why review is mandatory.

Select a supported path through human settings, not a silent network/provider switch. If neither is available, retain typed chat and optionally attach a supported clip through the existing attachment flow. That attachment must still be explicitly sent; a recording alone is not a task instruction. No always-listening wake word, continuous background recording, or realtime interruption is part of v1.

## UI/controller contracts

Device-local voice settings are closed `{enabled:boolean,language:string,recognition:'on_device_speech'|'prompt_audio',readAloud:'manual'|'conversation_opt_in',voiceURI:string|null,rate:number}`. language is a supported BCP-47 tag 1–40; voiceURI is an exact currently available local voice ID <=240 or null; rate 0.5–2 default 1. Defaults: disabled, device language, preferred supported path, manual, null, 1. Save never activates a microphone or downloads a model/pack automatically. Device voice identifiers/availability do not sync as portable agent settings.

Controller state is idle -> requesting_permission -> recording -> processing -> review -> submitted, with error/cancelled terminal exits returning to idle. A recordingId:ID and generation token prevent stale callbacks updating another draft. Maximum duration 60 seconds and recorded bytes 10 MiB, with a visible countdown and Stop/Discard. Use MediaRecorder.isTypeSupported plus actual decode/input compatibility; do not relabel a WebM blob as WAV. If conversion is necessary, use tested browser decoding/encoding code with explicit bounds, or reject unsupported encoding.

The direct human Send voice-draft operation is `{recordingId,expectedRevision,text}` with nonblank edited text 1–4000. It resolves to the same accepted user-message service as typed text, returning messageId/acceptedAt; source metadata is `{kind:'voice_transcript',recordingId,edited:boolean}`. It does not bypass the queue or directly answer a pending question. Dictation into a question/form field changes only that field's draft; the original question/form Submit still produces its exact structured answer. The model never decides whether a transcript is an approval click.

```json
{"recordingId":"recording-1","expectedRevision":1,"text":"Remind me in 30 minutes to review the meeting notes."}
```

Display permission/download status, elapsed recording time, Stop, Discard, transcript editor, and Send. Interim recognition text is draft only and cannot trigger tools. Empty/unrecognized audio yields no accepted user message. Do not auto-retry recording after denial. Stop all media tracks, recognition sessions, transcription sessions, listeners, buffers, and object URLs on Discard/teardown/page hiding while recording. Stop model work and Stop recording are clearly labeled independent controls; global teardown stops both.

Relative-time instructions anchor to when the reviewed transcript is explicitly sent, unless the user deliberately specifies an earlier instant. Preserve recording time as provenance, not a hidden alternative anchor. The clock tool still refreshes current time as specified. A queued transcript is an accepted message with its original acceptedAt and stale-resource checks.

## Local speech output

Use speechSynthesis.getVoices(), voiceschanged, and SpeechSynthesisUtterance. Select only voices with localService===true; do not fall back to a remote voice or a provider endpoint when none exists. If the selected local voice disappears, stop and offer another available local voice or text. A voice list initially empty is not a permanent failure; handle asynchronous discovery with a bounded visible wait.

Read accepted final text or a user-selected passage, stripping Markdown syntax through the safe renderer's plain-text extraction. Do not speak raw tool JSON, credentials, hidden notes, unsubmitted drafts, or every streaming token. Maximum spoken passage 4000 characters; split at sentence boundaries into app-owned queued utterances. Read aloud/Stop/Pause/Resume are native accessible controls. Conversation opt-in permits automatic final-reply reading in that foreground conversation only; it does not start input recording. Stop speech must work without cancelling a completed task or fabricating a model result. No downloadable audio file is promised by browser synthesis.

## Logging, persistence, and acceptance

Persist only accepted transcript/source metadata by default. Keep unsubmitted audio/transcripts ephemeral; explicitly saving audio uses the normal attachment storage/retention flow. Diagnostic events record capability/path, duration, errors, transcription prompt/result where an inference actually ran, and accepted edited text. Speech recognition interim results and audio bytes are not copied into logs. A transcription is a maintenance inference with no tools; it cannot inherit the local endpoint fallback route.

Add voice-controller.js and voice-view.js with small adapters for the detected APIs. Test user activation/permission denial, local-only recognition enforcement, pack download failure, codec mismatches, duration/byte limits, stale callbacks, mandatory review, typed answer validation, local voice filtering, playback cancellation, and teardown. Real Chrome audio/recognition tests are separate from mocked event tests. Verify no audio, recognition request, or speech-synthesis request is sent to an endpoint by this feature. Only the reviewed transcript explicitly sent by the human may enter the ordinary selected text-provider route. Typed chat works when every speech API is unavailable.

References: [Chrome Prompt API](https://developer.chrome.com/docs/ai/prompt-api), [on-device Web Speech](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API), and [local synthesis voices](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice/localService). Feature detection and actual native support govern which controls are enabled.
