import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Mock QRCode library
global.QRCode = vi.fn(function(element, options) {
  this.element = element;
  this.options = options;

  // Simulate QR code generation by creating a canvas
  const canvas = document.createElement('canvas');
  canvas.width = options.width;
  canvas.height = options.height;

  // Add toDataURL method to mock canvas download
  canvas.toDataURL = vi.fn(() => 'data:image/png;base64,mockImageData');

  element.appendChild(canvas);

  return this;
});

// Mock CorrectLevel
global.QRCode.CorrectLevel = {
  L: 1,
  M: 0,
  Q: 3,
  H: 2
};

describe('QRRapido.es - QR Code Generator', () => {
  let user;

  beforeEach(() => {
    // Load the HTML file
    const html = readFileSync(resolve(__dirname, 'index.html'), 'utf-8');
    document.body.innerHTML = html;

    // Execute the inline script
    const scriptContent = html.match(/<script>([\s\S]*?)<\/script>/)[1];
    eval(scriptContent);

    user = userEvent.setup();

    // Clear mocks
    vi.clearAllMocks();
  });

  describe('Page Structure', () => {
    it('should have the correct title', () => {
      expect(document.title).toBe('QRRapido.es - Generador de Códigos QR Gratis');
    });

    it('should display the main heading', () => {
      const heading = document.querySelector('h1');
      expect(heading.textContent).toBe('QRRapido.es');
    });

    it('should display the tagline', () => {
      const tagline = document.querySelector('.tagline');
      expect(tagline.textContent).toContain('Crea códigos QR personalizados en segundos');
    });

    it('should have all QR type options in the select', () => {
      const qrTypeSelect = document.getElementById('qrType');
      const options = Array.from(qrTypeSelect.options).map(opt => opt.value);

      expect(options).toEqual([
        'url',
        'text',
        'email',
        'phone',
        'sms',
        'wifi',
        'vcard'
      ]);
    });

    it('should display all feature cards', () => {
      const features = document.querySelectorAll('.feature');
      expect(features.length).toBe(4);
    });
  });

  describe('Dynamic Field Switching', () => {
    it('should show URL field by default', () => {
      const urlField = document.getElementById('urlField');
      expect(urlField.classList.contains('active')).toBe(true);
    });

    it('should switch to text field when text type is selected', async () => {
      const qrTypeSelect = document.getElementById('qrType');
      await user.selectOptions(qrTypeSelect, 'text');

      const textField = document.getElementById('textField');
      const urlField = document.getElementById('urlField');

      expect(textField.classList.contains('active')).toBe(true);
      expect(urlField.classList.contains('active')).toBe(false);
    });

    it('should switch to email field when email type is selected', async () => {
      const qrTypeSelect = document.getElementById('qrType');
      await user.selectOptions(qrTypeSelect, 'email');

      const emailField = document.getElementById('emailField');
      expect(emailField.classList.contains('active')).toBe(true);
    });

    it('should switch to wifi field when wifi type is selected', async () => {
      const qrTypeSelect = document.getElementById('qrType');
      await user.selectOptions(qrTypeSelect, 'wifi');

      const wifiField = document.getElementById('wifiField');
      expect(wifiField.classList.contains('active')).toBe(true);
    });

    it('should switch to vcard field when vcard type is selected', async () => {
      const qrTypeSelect = document.getElementById('qrType');
      await user.selectOptions(qrTypeSelect, 'vcard');

      const vcardField = document.getElementById('vcardField');
      expect(vcardField.classList.contains('active')).toBe(true);
    });
  });

  describe('Size Selection', () => {
    it('should have medium size selected by default', () => {
      const mediumOption = document.querySelector('.size-option[data-size="300"]');
      expect(mediumOption.classList.contains('active')).toBe(true);
    });

    it('should change active size when clicking on size option', async () => {
      const largeOption = document.querySelector('.size-option[data-size="400"]');
      await user.click(largeOption);

      expect(largeOption.classList.contains('active')).toBe(true);

      const mediumOption = document.querySelector('.size-option[data-size="300"]');
      expect(mediumOption.classList.contains('active')).toBe(false);
    });

    it('should update currentSize variable when selecting different size', async () => {
      const smallOption = document.querySelector('.size-option[data-size="200"]');
      await user.click(smallOption);

      // Verify by generating QR and checking the size passed to QRCode
      const urlInput = document.getElementById('url');
      await user.type(urlInput, 'https://test.com');

      const generateBtn = document.getElementById('generateBtn');
      await user.click(generateBtn);

      expect(global.QRCode).toHaveBeenCalledWith(
        expect.any(Element),
        expect.objectContaining({ width: 200, height: 200 })
      );
    });
  });

  describe('QR Code Generation - URL Type', () => {
    it('should generate QR code with URL', async () => {
      const urlInput = document.getElementById('url');
      await user.type(urlInput, 'https://example.com');

      const generateBtn = document.getElementById('generateBtn');
      await user.click(generateBtn);

      expect(global.QRCode).toHaveBeenCalledWith(
        expect.any(Element),
        expect.objectContaining({
          text: 'https://example.com',
          width: 300,
          height: 300
        })
      );
    });

    it('should show alert when URL is empty', async () => {
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      const generateBtn = document.getElementById('generateBtn');
      await user.click(generateBtn);

      expect(alertSpy).toHaveBeenCalledWith('Por favor, introduce una URL');
      alertSpy.mockRestore();
    });

    it('should enable download button after generating QR', async () => {
      const urlInput = document.getElementById('url');
      await user.type(urlInput, 'https://example.com');

      const downloadBtn = document.getElementById('downloadBtn');
      expect(downloadBtn.disabled).toBe(true);

      const generateBtn = document.getElementById('generateBtn');
      await user.click(generateBtn);

      expect(downloadBtn.disabled).toBe(false);
    });
  });

  describe('QR Code Generation - Text Type', () => {
    it('should generate QR code with text', async () => {
      const qrTypeSelect = document.getElementById('qrType');
      await user.selectOptions(qrTypeSelect, 'text');

      const textInput = document.getElementById('text');
      await user.type(textInput, 'Hello World');

      const generateBtn = document.getElementById('generateBtn');
      await user.click(generateBtn);

      expect(global.QRCode).toHaveBeenCalledWith(
        expect.any(Element),
        expect.objectContaining({
          text: 'Hello World'
        })
      );
    });

    it('should show alert when text is empty', async () => {
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      const qrTypeSelect = document.getElementById('qrType');
      await user.selectOptions(qrTypeSelect, 'text');

      const generateBtn = document.getElementById('generateBtn');
      await user.click(generateBtn);

      expect(alertSpy).toHaveBeenCalledWith('Por favor, introduce un texto');
      alertSpy.mockRestore();
    });
  });

  describe('QR Code Generation - Email Type', () => {
    it('should generate QR code with email', async () => {
      const qrTypeSelect = document.getElementById('qrType');
      await user.selectOptions(qrTypeSelect, 'email');

      const emailInput = document.getElementById('email');
      await user.type(emailInput, 'test@example.com');

      const generateBtn = document.getElementById('generateBtn');
      await user.click(generateBtn);

      expect(global.QRCode).toHaveBeenCalledWith(
        expect.any(Element),
        expect.objectContaining({
          text: 'mailto:test@example.com'
        })
      );
    });

    it('should generate QR code with email and subject', async () => {
      const qrTypeSelect = document.getElementById('qrType');
      await user.selectOptions(qrTypeSelect, 'email');

      const emailInput = document.getElementById('email');
      await user.type(emailInput, 'test@example.com');

      const subjectInput = document.getElementById('emailSubject');
      await user.type(subjectInput, 'Test Subject');

      const generateBtn = document.getElementById('generateBtn');
      await user.click(generateBtn);

      expect(global.QRCode).toHaveBeenCalledWith(
        expect.any(Element),
        expect.objectContaining({
          text: 'mailto:test@example.com?subject=Test%20Subject'
        })
      );
    });
  });

  describe('QR Code Generation - Phone Type', () => {
    it('should generate QR code with phone number', async () => {
      const qrTypeSelect = document.getElementById('qrType');
      await user.selectOptions(qrTypeSelect, 'phone');

      const phoneInput = document.getElementById('phone');
      await user.type(phoneInput, '+34600000000');

      const generateBtn = document.getElementById('generateBtn');
      await user.click(generateBtn);

      expect(global.QRCode).toHaveBeenCalledWith(
        expect.any(Element),
        expect.objectContaining({
          text: 'tel:+34600000000'
        })
      );
    });
  });

  describe('QR Code Generation - SMS Type', () => {
    it('should generate QR code with SMS', async () => {
      const qrTypeSelect = document.getElementById('qrType');
      await user.selectOptions(qrTypeSelect, 'sms');

      const smsPhoneInput = document.getElementById('smsPhone');
      await user.type(smsPhoneInput, '+34600000000');

      const smsMessageInput = document.getElementById('smsMessage');
      await user.type(smsMessageInput, 'Hello SMS');

      const generateBtn = document.getElementById('generateBtn');
      await user.click(generateBtn);

      expect(global.QRCode).toHaveBeenCalledWith(
        expect.any(Element),
        expect.objectContaining({
          text: 'sms:+34600000000?body=Hello%20SMS'
        })
      );
    });
  });

  describe('QR Code Generation - WiFi Type', () => {
    it('should generate QR code with WiFi credentials', async () => {
      const qrTypeSelect = document.getElementById('qrType');
      await user.selectOptions(qrTypeSelect, 'wifi');

      const ssidInput = document.getElementById('wifiSSID');
      await user.type(ssidInput, 'MyWiFi');

      const passwordInput = document.getElementById('wifiPassword');
      await user.type(passwordInput, 'password123');

      const generateBtn = document.getElementById('generateBtn');
      await user.click(generateBtn);

      expect(global.QRCode).toHaveBeenCalledWith(
        expect.any(Element),
        expect.objectContaining({
          text: 'WIFI:T:WPA;S:MyWiFi;P:password123;;'
        })
      );
    });

    it('should generate WiFi QR with different security types', async () => {
      const qrTypeSelect = document.getElementById('qrType');
      await user.selectOptions(qrTypeSelect, 'wifi');

      const ssidInput = document.getElementById('wifiSSID');
      await user.type(ssidInput, 'TestNetwork');

      const securitySelect = document.getElementById('wifiSecurity');
      await user.selectOptions(securitySelect, 'WEP');

      const generateBtn = document.getElementById('generateBtn');
      await user.click(generateBtn);

      expect(global.QRCode).toHaveBeenCalledWith(
        expect.any(Element),
        expect.objectContaining({
          text: 'WIFI:T:WEP;S:TestNetwork;P:;;'
        })
      );
    });
  });

  describe('QR Code Generation - vCard Type', () => {
    it('should generate QR code with vCard', async () => {
      const qrTypeSelect = document.getElementById('qrType');
      await user.selectOptions(qrTypeSelect, 'vcard');

      const nameInput = document.getElementById('vcardName');
      await user.type(nameInput, 'John Doe');

      const phoneInput = document.getElementById('vcardPhone');
      await user.type(phoneInput, '+34600000000');

      const emailInput = document.getElementById('vcardEmail');
      await user.type(emailInput, 'john@example.com');

      const companyInput = document.getElementById('vcardCompany');
      await user.type(companyInput, 'Acme Corp');

      const generateBtn = document.getElementById('generateBtn');
      await user.click(generateBtn);

      expect(global.QRCode).toHaveBeenCalledWith(
        expect.any(Element),
        expect.objectContaining({
          text: 'BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nTEL:+34600000000\nEMAIL:john@example.com\nORG:Acme Corp\nEND:VCARD'
        })
      );
    });

    it('should generate vCard with only required fields', async () => {
      const qrTypeSelect = document.getElementById('qrType');
      await user.selectOptions(qrTypeSelect, 'vcard');

      const nameInput = document.getElementById('vcardName');
      await user.type(nameInput, 'Jane Doe');

      const generateBtn = document.getElementById('generateBtn');
      await user.click(generateBtn);

      expect(global.QRCode).toHaveBeenCalledWith(
        expect.any(Element),
        expect.objectContaining({
          text: 'BEGIN:VCARD\nVERSION:3.0\nFN:Jane Doe\nEND:VCARD'
        })
      );
    });
  });

  describe('Color Customization', () => {
    it('should use default colors (black and white)', async () => {
      const urlInput = document.getElementById('url');
      await user.type(urlInput, 'https://test.com');

      const generateBtn = document.getElementById('generateBtn');
      await user.click(generateBtn);

      expect(global.QRCode).toHaveBeenCalledWith(
        expect.any(Element),
        expect.objectContaining({
          colorDark: '#000000',
          colorLight: '#ffffff'
        })
      );
    });

    it('should apply custom colors to QR code', async () => {
      const colorDarkInput = document.getElementById('colorDark');
      colorDarkInput.value = '#ff0000';

      const colorLightInput = document.getElementById('colorLight');
      colorLightInput.value = '#00ff00';

      const urlInput = document.getElementById('url');
      await user.type(urlInput, 'https://test.com');

      const generateBtn = document.getElementById('generateBtn');
      await user.click(generateBtn);

      expect(global.QRCode).toHaveBeenCalledWith(
        expect.any(Element),
        expect.objectContaining({
          colorDark: '#ff0000',
          colorLight: '#00ff00'
        })
      );
    });
  });

  describe('Download Functionality', () => {
    it('should download QR code as PNG', async () => {
      const urlInput = document.getElementById('url');
      await user.type(urlInput, 'https://test.com');

      const generateBtn = document.getElementById('generateBtn');
      await user.click(generateBtn);

      // Mock link click
      const createElementSpy = vi.spyOn(document, 'createElement');

      const downloadBtn = document.getElementById('downloadBtn');
      await user.click(downloadBtn);

      const linkCalls = createElementSpy.mock.results
        .map(result => result.value)
        .filter(element => element && element.tagName === 'A');

      expect(linkCalls.length).toBeGreaterThan(0);
      const link = linkCalls[0];
      expect(link.download).toBe('qrrapido-codigo.png');
      expect(link.href).toBe('data:image/png;base64,mockImageData');

      createElementSpy.mockRestore();
    });

    it('should have download button disabled initially', () => {
      const downloadBtn = document.getElementById('downloadBtn');
      expect(downloadBtn.disabled).toBe(true);
    });
  });

  describe('QR Code Regeneration', () => {
    it('should clear previous QR code when generating new one', async () => {
      const urlInput = document.getElementById('url');
      await user.type(urlInput, 'https://first.com');

      const generateBtn = document.getElementById('generateBtn');
      await user.click(generateBtn);

      const qrcodeDiv = document.getElementById('qrcode');
      const firstCanvas = qrcodeDiv.querySelector('canvas');
      expect(firstCanvas).toBeTruthy();

      // Clear input and generate new QR
      await user.clear(urlInput);
      await user.type(urlInput, 'https://second.com');
      await user.click(generateBtn);

      // Should still have only one canvas
      const canvases = qrcodeDiv.querySelectorAll('canvas');
      expect(canvases.length).toBe(1);

      // Verify new QR was generated
      expect(global.QRCode).toHaveBeenCalledTimes(2);
    });
  });

  describe('Correct Level', () => {
    it('should use high error correction level', async () => {
      const urlInput = document.getElementById('url');
      await user.type(urlInput, 'https://test.com');

      const generateBtn = document.getElementById('generateBtn');
      await user.click(generateBtn);

      expect(global.QRCode).toHaveBeenCalledWith(
        expect.any(Element),
        expect.objectContaining({
          correctLevel: QRCode.CorrectLevel.H
        })
      );
    });
  });
});
