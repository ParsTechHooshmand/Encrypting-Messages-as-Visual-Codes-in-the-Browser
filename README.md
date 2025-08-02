# Text-to-Image Encryption Challenge: Quantum Cipher Matrix

## Challenge Description

Develop a browser-based encryption system that converts text into a visual image composed of colored blocks and allows reversing the image back into the original message.

### Challenge Goals

- **Text Encryption**: Transforms each character into a uniquely colored block using quantum-inspired logic.
- **Image Generation**: Visually displays encrypted text as a grid of divs or canvas elements; supports export as PNG or QR.
- **Image Decryption**: Uploads encrypted images and decodes them back to the original text using color analysis.
- **Uniqueness & Security**: Each character maps to a distinct color pattern based on entropy, character code, and position.
- **Client-side Only**: All functionality must be implemented in HTML, CSS, and JavaScript without external libraries or server use.

---

## Input/Output

**Input:** 
- User-provided text via input box
- Image uploads for decryption

**Output:** 
- Visual grid of cipher blocks
- Stats: byte count, complexity, security level
- Logs and system feedback
- Decrypted text upon image analysis

---

## Our Solution: Quantum Cipher Matrix

### HTML (index.html)
- Terminal-inspired UI with areas for text input, cipher block display, output text, image upload, and tools.
- Buttons for encryption, decryption, image export, QR sharing, and mode toggles (hack, stealth).
- Panels for system stats, character alphabet preview, and notifications.

### CSS (style.css)
- Matrix-themed black/green interface with glowing effects and cyber fonts.
- `.char-A` to `.char-Z` color-coded using HSL.
- Grid of blocks with hover animations, tooltips, and clickable events.
- Animated matrix rain, stealth blur overlays, and print media rules.

### JavaScript (script.js)

#### Encryption Process (`quantumEncryptData()`)
- Converts input text to uppercase and filters valid characters.
- For each character, calculates:
  - Quantum amplitude, phase, and spin using charCode and golden ratio
  - HSL color (Hue based on phase/amplitude)
  - Encrypted symbol using Caesar-style shift modulated by quantum state
- Renders encrypted output as colored blocks in a grid (`displayCipher()`)

#### Image Generation & Export
- Uses canvas (hidden or visible) to draw cipher blocks and enable PNG export.
- QR code generation for sharing cipher image/link.

#### Decryption Process (`analyzeImageForDecryption()`)
- Accepts image upload and reads pixel data via canvas.
- Extracts hue values and maps them back to characters via indexed color mapping.
- Outputs decrypted string to display.

#### Other Functionalities
- **Hints & Alphabet View**: Shows each supported character and corresponding color.
- **Hack Mode**: Enables clicking blocks for interaction (animations, logs).
- **Stats Calculation**: Byte count, complexity score, quantum state average.
- **Share Tools**: Clipboard, QR, email, Telegram, etc.
- **Modes**: Stealth (blurs data), Superposition (random patterns), Emergency Exit (wipe all).

---

## Algorithms Used

- **Quantum Key Generation**: `crypto.getRandomValues()` + timestamp + π
- **Color Assignment**: HSL calculated from amplitude/phase (via sine/cosine waveforms)
- **Encryption Mapping**: Caesar-like shift based on quantum phase and position
- **Color-to-Character Mapping**: Hue range quantized to character indices during decryption
- **BFS-like Scanning**: For QR generation and grid layout
- **Matrix Rain**: Character animation in canvas or divs

---

## Creative Features

- Cyber/Matrix UI with real-time encryption feedback
- Unique color mapping for each character (including extended alphabets)
- Entanglement logic (linked characters/patterns)
- Live statistics and operation logs with timestamp
- Fully interactive encryption blocks (click-to-reveal, animations)
- No external dependencies, runs fully in browser

---

Quantum Cipher Matrix brings encryption to life as a visual, gamified system. It combines crypto logic with engaging UI, turning secure communication into an artistic and educational experience.