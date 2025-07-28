class QuantumCipherMatrix {
    constructor() {
        this.currentData = [];
        this.encryptionKey = this.generateQuantumKey();
        this.isHackMode = false;
        this.complexityMatrix = [];
        this.initializeMatrix();
        this.setupEventListeners();
        this.generateAlphabetPreview();
    }

    generateQuantumKey() {
        const quantumSeed = Date.now() * Math.PI;
        const entropy = new Uint8Array(32);
        crypto.getRandomValues(entropy);
        return Array.from(entropy).map(b => b.toString(16)).join('');
    }

    initializeMatrix() {
        this.createMatrixRain();
        this.updateStats('', [], 0);
        this.logMessage('QUANTUM CIPHER SYSTEM INITIALIZED - READY FOR OPERATIONS');
    }

    createMatrixRain() {
        const container = document.getElementById('matrixBg');
        const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийклмнопрстуфхцчшщъыьэюя!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        for (let i = 0; i < 35; i++) {
            const column = document.createElement('div');
            column.className = 'matrix-column';
            column.style.left = Math.random() * 100 + 'vw';
            column.style.animationDuration = (Math.random() * 3 + 2) + 's';
            column.style.animationDelay = Math.random() * 2 + 's';
            
            let text = '';
            for (let j = 0; j < 35; j++) {
                text += chars.charAt(Math.floor(Math.random() * chars.length)) + '\n';
            }
            column.textContent = text;
            container.appendChild(column);
        }
    }

    setupEventListeners() {
        const textInput = document.getElementById('textInput');
        textInput.addEventListener('input', () => {
            clearTimeout(this.encryptionTimeout);
            this.encryptionTimeout = setTimeout(() => {
                this.executeEncryption();
            }, 300);
        });
    }

    executeEncryption() {
        const startTime = performance.now();
        const text = document.getElementById('textInput').value.toUpperCase();
        
        if (!text.trim()) {
            this.logMessage('ERROR: NO DATA PROVIDED FOR QUANTUM ENCRYPTION', 'error');
            return;
        }

        const encrypted = this.quantumEncryptData(text);
        this.displayCipher(encrypted);
        
        const encryptionTime = Math.round(performance.now() - startTime);
        this.updateStats(text, encrypted, encryptionTime);
        this.logMessage(`QUANTUM ENCRYPTION COMPLETE - ${encrypted.length} BLOCKS | ${encryptionTime}ms`);
    }

    quantumEncryptData(text) {
        const cleanText = text.replace(/[^A-ZА-Я ]/g, '');
        const encrypted = [];
        
        cleanText.split('').forEach((char, index) => {
            const quantumState = this.calculateQuantumState(char, index);
            const entanglement = this.quantumEntanglement(char, index, cleanText.length);
            
            encrypted.push({
                char: char,
                original: char,
                index: index,
                isSpace: char === ' ',
                color: this.getQuantumColor(char, quantumState),
                quantumState: quantumState,
                entanglement: entanglement,
                frequency: this.calculateCharFrequency(char, cleanText),
                position: index / cleanText.length,
                encrypted: this.encryptChar(char, quantumState)
            });
        });
        
        this.currentData = encrypted;
        this.complexityMatrix = this.generateComplexityMatrix(encrypted);
        return encrypted;
    }

    calculateQuantumState(char, position) {
        const charCode = char.charCodeAt(0);
        const phi = (1 + Math.sqrt(5)) / 2;
        const wave = Math.sin((charCode * position * phi) / 100);
        const probability = (wave + 1) / 2;
        return {
            amplitude: probability,
            phase: (position * charCode) % 360,
            spin: probability > 0.5 ? 'up' : 'down',
            entangled: position % 2 === 0
        };
    }

    quantumEntanglement(char, position, totalLength) {
        const partners = [];
        for (let i = 0; i < totalLength; i++) {
            if (i !== position && Math.abs(i - position) % 7 === 0) {
                partners.push(i);
            }
        }
        return partners;
    }

    encryptChar(char, quantumState) {
        const charCode = char.charCodeAt(0);
        const shift = Math.floor(quantumState.amplitude * 26) + quantumState.phase % 26;
        if (char === ' ') return char;
        
        let newCharCode = charCode + shift;
        if (char >= 'A' && char <= 'Z') {
            newCharCode = ((newCharCode - 65) % 26) + 65;
        } else if (char >= 'А' && char <= 'Я') {
            newCharCode = ((newCharCode - 1040) % 33) + 1040;
        }
        
        return String.fromCharCode(newCharCode);
    }

    calculateCharFrequency(char, text) {
        return text.split(char).length - 1;
    }

    getQuantumColor(char, quantumState) {
        if (char === ' ') return 'var(--matrix-green)';
        
        const hue = (quantumState.phase + quantumState.amplitude * 360) % 360;
        const saturation = 80 + (quantumState.amplitude * 20);
        const lightness = 50 + (quantumState.amplitude * 30);
        
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    generateComplexityMatrix(encrypted) {
        const matrix = [];
        for (let i = 0; i < encrypted.length; i++) {
            const complexity = this.calculateComplexity(encrypted[i], encrypted);
            matrix.push(complexity);
        }
        return matrix;
    }

    calculateComplexity(item, allItems) {
        let complexity = 0;
        
        complexity += (1 / item.frequency) * 10;
        complexity += item.position * 20;
        complexity += item.quantumState.amplitude * 30;
        complexity += item.entanglement.length * 15;
        
        return Math.min(complexity, 100);
    }

    displayCipher(encrypted) {
        const grid = document.getElementById('cipherGrid');
        grid.innerHTML = '';

        if (encrypted.length === 0) {
            grid.innerHTML = '<div style="text-align: center; width: 100%; color: var(--warning-red);">◦ QUANTUM_ENCRYPTION_FAILED ◦</div>';
            return;
        }

        encrypted.forEach((item, index) => {
            const block = document.createElement('div');
            block.className = `cipher-block char-${item.char}`;
            
            if (item.isSpace) {
                block.classList.add('space-block');
                block.textContent = '□';
                block.title = 'QUANTUM_SPACE_NODE';
            } else {
                block.textContent = item.encrypted;
                block.title = `ORIGINAL: ${item.char} | ENCRYPTED: ${item.encrypted} | QUANTUM_STATE: ${item.quantumState.spin} | COMPLEXITY: ${Math.round(this.complexityMatrix[index] || 0)}%`;
            }
            
            block.style.color = item.color;
            block.style.borderColor = item.color;
            block.style.animationDelay = `${index * 0.05}s`;
            
            if (item.quantumState && item.quantumState.amplitude > 0.7) {
                block.style.boxShadow = `0 0 15px ${item.color}`;
            }
            
            block.addEventListener('click', () => {
                this.hackBlock(block, item, index);
            });

            grid.appendChild(block);
        });
    }

    hackBlock(block, item, index) {
        const complexity = this.complexityMatrix[index] || 0;
        block.style.transform = `scale(1.3) rotate(${item.quantumState.phase}deg)`;
        block.style.boxShadow = `0 0 25px ${item.color}`;
        
        this.logMessage(`QUANTUM_BLOCK_ACCESS: ${item.original}→${item.encrypted} | STATE: ${item.quantumState.spin} | COMPLEXITY: ${Math.round(complexity)}%`);
        
        setTimeout(() => {
            block.style.transform = '';
            block.style.boxShadow = item.quantumState.amplitude > 0.7 ? `0 0 15px ${item.color}` : '';
        }, 800);
    }

    generateAlphabetPreview() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789';
        const preview = document.getElementById('alphabetPreview');
        
        alphabet.split('').forEach(char => {
            const block = document.createElement('div');
            block.className = `alphabet-block char-${char}`;
            block.textContent = char;
            
            const quantumState = this.calculateQuantumState(char, 0);
            const color = this.getQuantumColor(char, quantumState);
            
            block.style.color = color;
            block.style.borderColor = color;
            block.title = `${char} | QUANTUM_PATTERN`;
            
            block.addEventListener('click', () => {
                document.getElementById('textInput').value += char;
                this.executeEncryption();
            });
            
            preview.appendChild(block);
        });
    }

    updateStats(text, encrypted, encryptionTime) {
        document.getElementById('charCount').textContent = text.length;
        document.getElementById('blockCount').textContent = encrypted.length;
        document.getElementById('spaceCount').textContent = (text.match(/ /g) || []).length;
        document.getElementById('encryptionTime').textContent = encryptionTime + 'ms';
        
        const avgComplexity = this.complexityMatrix.length > 0 
            ? this.complexityMatrix.reduce((a, b) => a + b, 0) / this.complexityMatrix.length 
            : 0;
        document.getElementById('complexityLevel').textContent = Math.round(avgComplexity) + '%';
        
        let security = 'MINIMAL';
        if (text.length > 5) security = 'LOW';
        if (text.length > 10) security = 'MEDIUM';
        if (text.length > 20) security = 'HIGH';
        if (text.length > 30) security = 'ULTRA';
        if (text.length > 50) security = 'QUANTUM';
        if (text.length > 100) security = 'CLASSIFIED';
        
        document.getElementById('securityLevel').textContent = security;
    }

    async handleImageUpload() {
        const fileInput = document.getElementById('imageInput');
        const file = fileInput.files[0];
        
        if (!file) return;
        
        this.logMessage('IMAGE UPLOADED - PREPARING FOR QUANTUM ANALYSIS...');
        
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                
                this.analyzeImageForDecryption(ctx, canvas);
            };
            
            img.src = URL.createObjectURL(file);
        } catch (error) {
            this.logMessage('ERROR: IMAGE ANALYSIS FAILED', 'error');
        }
    }

    analyzeImageForDecryption(ctx, canvas) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        
        const colorPatterns = [];
        for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            
            if (r > 100 || g > 100 || b > 100) {
                const hue = this.rgbToHue(r, g, b);
                colorPatterns.push(Math.round(hue));
            }
        }
        
        const decryptedChars = this.decryptColorPatterns(colorPatterns);
        if (decryptedChars.length > 0) {
            document.getElementById('outputText').value = decryptedChars;
            this.logMessage(`QUANTUM DECRYPTION SUCCESSFUL - ${decryptedChars.length} CHARS RECOVERED`);
        } else {
            this.logMessage('NO QUANTUM CIPHER PATTERNS DETECTED IN IMAGE', 'warning');
        }
    }

    rgbToHue(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h;
        
        if (max === min) {
            h = 0;
        } else {
            const d = max - min;
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        
        return h * 360;
    }

    decryptColorPatterns(patterns) {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ';
        let result = '';
        
        patterns.forEach(hue => {
            const charIndex = Math.round((hue / 360) * alphabet.length) % alphabet.length;
            result += alphabet[charIndex];
        });
        
        return result.trim();
    }

    executeDecryption() {
        if (this.currentData.length === 0) {
            this.logMessage('ERROR: NO QUANTUM CIPHER DATA AVAILABLE', 'error');
            return;
        }

        const decrypted = this.currentData.map(item => {
            if (item.isSpace) return ' ';
            
            const originalCharCode = item.original.charCodeAt(0);
            return item.original;
        }).join('');

        document.getElementById('outputText').value = decrypted;
        this.logMessage('QUANTUM DECRYPTION SUCCESSFUL - ORIGINAL DATA RESTORED');
    }

    async generateQR() {
        if (this.currentData.length === 0) {
            this.logMessage('ERROR: NO QUANTUM DATA TO ENCODE', 'error');
            return;
        }

        const qrData = JSON.stringify({
            data: this.currentData.map(item => item.encrypted).join(''),
            original: this.currentData.map(item => item.original).join(''),
            key: this.encryptionKey,
            timestamp: Date.now()
        });
        
        const canvas = document.getElementById('qrCanvas');
        
        try {
            canvas.innerHTML = '<div class="loading"></div> GENERATING QUANTUM QR...';
            this.logMessage('GENERATING QUANTUM QR CODE...');
            
            await QRCode.toCanvas(canvas, qrData, {
                width: 300,
                margin: 3,
                color: {
                    dark: '#00ff41',
                    light: '#000000'
                },
                errorCorrectionLevel: 'H'
            });
            
            document.getElementById('qrModal').style.display = 'flex';
            this.logMessage('QUANTUM QR CODE GENERATED WITH ADVANCED ERROR CORRECTION');
        } catch (error) {
            this.logMessage('ERROR: QUANTUM QR GENERATION FAILED', 'error');
        }
    }

    async exportImage() {
        if (this.currentData.length === 0) {
            this.logMessage('ERROR: NO QUANTUM DATA TO EXPORT', 'error');
            return;
        }

        try {
            this.logMessage('EXPORTING QUANTUM CIPHER IMAGE...');
            const canvas = await html2canvas(document.getElementById('cipherGrid'), {
                backgroundColor: '#000000',
                scale: 3,
                useCORS: true,
                allowTaint: true
            });
            
            const link = document.createElement('a');
            link.download = `quantum-cipher-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            this.logMessage('QUANTUM CIPHER IMAGE EXPORTED SUCCESSFULLY');
        } catch (error) {
            this.logMessage('ERROR: QUANTUM EXPORT FAILED', 'error');
        }
    }

    printCipher() {
        if (this.currentData.length === 0) {
            this.logMessage('ERROR: NO QUANTUM DATA TO PRINT', 'error');
            return;
        }
        
        this.logMessage('PREPARING QUANTUM CIPHER FOR PRINT...');
        window.print();
    }

    copyToClipboard() {
        if (this.currentData.length === 0) {
            this.logMessage('ERROR: NO QUANTUM DATA TO COPY', 'error');
            return;
        }

        const data = {
            encrypted: this.currentData.map(item => item.encrypted).join(''),
            original: this.currentData.map(item => item.original).join(''),
            complexity: Math.round(this.complexityMatrix.reduce((a, b) => a + b, 0) / this.complexityMatrix.length),
            timestamp: new Date().toISOString()
        };

        navigator.clipboard.writeText(JSON.stringify(data, null, 2)).then(() => {
            this.logMessage('QUANTUM CIPHER DATA COPIED TO CLIPBOARD');
        }).catch(() => {
            this.logMessage('ERROR: CLIPBOARD ACCESS DENIED', 'error');
        });
    }

    openAlphabetPreview() {
        document.getElementById('alphabetModal').style.display = 'flex';
        this.logMessage('QUANTUM ALPHABET PATTERNS DISPLAYED');
    }

    openShareModal() {
        if (this.currentData.length === 0) {
            this.logMessage('ERROR: NO QUANTUM DATA TO SHARE', 'error');
            return;
        }
        document.getElementById('shareModal').style.display = 'flex';
    }

    closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    shareViaEmail() {
        const subject = 'Quantum Cipher Matrix - Classified Data';
        const body = `Encrypted Data: ${this.currentData.map(item => item.encrypted).join('')}\n\nGenerated by Quantum Cipher Matrix v4.2`;
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        this.logMessage('EMAIL SHARING INITIATED');
    }

    shareViaClipboard() {
        this.copyToClipboard();
    }

    shareAsLink() {
        const data = btoa(JSON.stringify(this.currentData));
        const url = `${window.location.origin}${window.location.pathname}?cipher=${data}`;
        navigator.clipboard.writeText(url).then(() => {
            this.logMessage('SECURE SHARING LINK COPIED TO CLIPBOARD');
        });
    }

    shareAsQR() {
        this.generateQR();
    }

    shareAsTelegram() {
        const text = `🔐 Quantum Cipher ${this.currentData.map(item => item.encrypted).join('')}`;
        window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`);
        this.logMessage('TELEGRAM SHARING INITIATED');
    }

    shareAsWhatsApp() {
        const text = `🔐 Quantum Cipher Matrix\nEncrypted: ${this.currentData.map(item => item.encrypted).join('')}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
        this.logMessage('WHATSAPP SHARING INITIATED');
    }

    logMessage(message, type = 'info') {
        const messageElement = document.getElementById('terminalMessage');
        const timestamp = new Date().toLocaleTimeString();
        
        messageElement.setAttribute('data-time', timestamp);
        messageElement.textContent = message;
        messageElement.className = `terminal-message ${type} show`;
        
        setTimeout(() => {
            messageElement.classList.remove('show');
        }, 7000);
    }

    clearAll() {
        document.getElementById('textInput').value = '';
        document.getElementById('outputText').value = '';
        document.getElementById('cipherGrid').innerHTML = '<div style="text-align: center; width: 100%; color: var(--text-dim);">◦ QUANTUM_MEMORY_WIPED ◦</div>';
        this.currentData = [];
        this.complexityMatrix = [];
        this.updateStats('', [], 0);
        this.logMessage('ALL QUANTUM DATA WIPED FROM MEMORY');
    }

    downloadJSON() {
        if (this.currentData.length === 0) {
            this.logMessage('ERROR: NO QUANTUM DATA TO EXPORT', 'error');
            return;
        }
        
        const exportData = {
            version: '4.2',
            timestamp: new Date().toISOString(),
            encryptionKey: this.encryptionKey,
            cipherData: this.currentData,
            complexityMatrix: this.complexityMatrix
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `quantum-cipher-${Date.now()}.json`;
        link.click();
        this.logMessage('QUANTUM JSON DATA EXPORTED');
    }

    uploadJSON() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = JSON.parse(e.target.result);
                        if (data.cipherData && data.version) {
                            this.currentData = data.cipherData;
                            this.complexityMatrix = data.complexityMatrix || [];
                            this.encryptionKey = data.encryptionKey || this.generateQuantumKey();
                            this.displayCipher(data.cipherData);
                            
                            const text = data.cipherData.map(item => item.original).join('');
                            document.getElementById('textInput').value = text;
                            this.updateStats(text, data.cipherData, 0);
                            this.logMessage('QUANTUM JSON DATA IMPORTED SUCCESSFULLY');
                        } else {
                            throw new Error('Invalid format');
                        }
                    } catch (error) {
                        this.logMessage('ERROR: INVALID QUANTUM JSON FILE', 'error');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

    quantumEncrypt() {
        this.logMessage('ACTIVATING QUANTUM SUPERPOSITION MODE...', 'warning');
        document.body.style.filter = 'hue-rotate(120deg) saturate(1.5)';
        setTimeout(() => {
            this.executeEncryption();
            document.body.style.filter = '';
            this.logMessage('QUANTUM SUPERPOSITION ENCRYPTION COMPLETE');
        }, 2000);
    }

    breakQuantum() {
        this.logMessage('ATTEMPTING QUANTUM DECRYPTION BREAK...', 'warning');
        setTimeout(() => {
            this.logMessage('QUANTUM ENTANGLEMENT BROKEN - DECRYPTION VULNERABILITY DETECTED', 'error');
        }, 3000);
    }

    neuralCrack() {
        this.logMessage('DEPLOYING NEURAL NETWORK CIPHER ANALYSIS...', 'warning');
        setTimeout(() => {
            this.logMessage('NEURAL PATTERNS ANALYZED - COMPLEXITY MATRIX UPDATED');
            if (this.currentData.length > 0) {
                this.displayCipher(this.currentData);
            }
        }, 2500);
    }

    superPosition() {
        this.logMessage('ENTERING QUANTUM SUPERPOSITION STATE...', 'warning');
        document.body.style.animation = 'quantum-flicker 3s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
            this.logMessage('SUPERPOSITION STATE COLLAPSED - REALITY RESTORED');
        }, 5000);
    }

    hackMode() {
        this.isHackMode = !this.isHackMode;
        document.body.style.filter = this.isHackMode ? 'hue-rotate(180deg) contrast(1.2)' : '';
        this.logMessage(this.isHackMode ? 'QUANTUM HACK MODE ACTIVATED' : 'HACK MODE DEACTIVATED');
    }

    ghostProtocol() {
        document.body.style.opacity = '0.7';
        this.logMessage('GHOST PROTOCOL INITIATED - GOING QUANTUM DARK', 'warning');
        setTimeout(() => {
            document.body.style.opacity = '1';
            this.logMessage('GHOST PROTOCOL COMPLETED - QUANTUM VISIBILITY RESTORED');
        }, 3000);
    }

    matrixReload() {
        document.getElementById('matrixBg').innerHTML = '';
        this.createMatrixRain();
        this.logMessage('QUANTUM MATRIX BACKGROUND RELOADED');
    }

    encryptionBoost() {
        this.logMessage('QUANTUM ENCRYPTION ALGORITHMS OPTIMIZED');
        if (this.currentData.length > 0) {
            this.displayCipher(this.currentData);
        }
    }

    goStealth() {
        document.body.style.filter = 'brightness(0.3) contrast(2)';
        this.logMessage('QUANTUM STEALTH MODE ENGAGED - INVISIBLE TO ALL SENSORS', 'warning');
        setTimeout(() => {
            document.body.style.filter = '';
        }, 5000);
    }

    anonymousMode() {
        this.logMessage('CONNECTING TO QUANTUM ANONYMOUS NETWORK...');
        setTimeout(() => {
            this.logMessage('QUANTUM ANONYMOUS CONNECTION ESTABLISHED');
        }, 2000);
    }

    coverTracks() {
        this.logMessage('COVERING QUANTUM DIGITAL FOOTPRINTS...', 'warning');
        setTimeout(() => {
            this.logMessage('QUANTUM TRACKS COVERED - NO TRACE IN ANY DIMENSION');
        }, 2500);
    }

    emergencyExit() {
        document.body.style.opacity = '0';
        this.logMessage('QUANTUM EMERGENCY EXIT PROTOCOL ACTIVATED', 'error');
        setTimeout(() => {
            document.body.style.opacity = '1';
            this.logMessage('QUANTUM SYSTEM RESTORED FROM BACKUP DIMENSION');
        }, 3000);
    }
}

const cipher = new QuantumCipherMatrix();

function executeEncryption() { cipher.executeEncryption(); }
function executeDecryption() { cipher.executeDecryption(); }
function exportImage() { cipher.exportImage(); }
function generateQR() { cipher.generateQR(); }
function printCipher() { cipher.printCipher(); }
function handleImageUpload() { cipher.handleImageUpload(); }
function openAlphabetPreview() { cipher.openAlphabetPreview(); }
function openShareModal() { cipher.openShareModal(); }
function closeModal(id) { cipher.closeModal(id); }
function downloadQR() {
    const canvas = document.querySelector('#qrCanvas canvas');
    if (canvas) {
        const link = document.createElement('a');
        link.download = `quantum-qr-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
        cipher.logMessage('QUANTUM QR CODE DOWNLOADED');
    }
}
function copyToClipboard() { cipher.copyToClipboard(); }
function clearAll() { cipher.clearAll(); }
function downloadJSON() { cipher.downloadJSON(); }
function uploadJSON() { cipher.uploadJSON(); }
function hackMode() { cipher.hackMode(); }
function ghostProtocol() { cipher.ghostProtocol(); }
function matrixReload() { cipher.matrixReload(); }
function encryptionBoost() { cipher.encryptionBoost(); }
function quantumEncrypt() { cipher.quantumEncrypt(); }
function breakQuantum() { cipher.breakQuantum(); }
function neuralCrack() { cipher.neuralCrack(); }
function superPosition() { cipher.superPosition(); }
function goStealth() { cipher.goStealth(); }
function anonymousMode() { cipher.anonymousMode(); }
function coverTracks() { cipher.coverTracks(); }
function emergencyExit() { cipher.emergencyExit(); }

function shareViaEmail() { cipher.shareViaEmail(); }
function shareViaClipboard() { cipher.shareViaClipboard(); }
function shareAsLink() { cipher.shareAsLink(); }
function shareAsQR() { cipher.shareAsQR(); }
function shareAsTelegram() { cipher.shareAsTelegram(); }
function shareAsWhatsApp() { cipher.shareAsWhatsApp(); }

window.addEventListener('load', () => {
    cipher.logMessage('◦ QUANTUM CIPHER MATRIX SYSTEM v4.2 ONLINE ◦');
    setTimeout(() => {
        cipher.executeEncryption();
    }, 1000);
});

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('qr-modal') || 
        e.target.classList.contains('alphabet-modal') || 
        e.target.classList.contains('share-modal')) {
        e.target.style.display = 'none';
    }
});
