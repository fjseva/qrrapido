# QRRapido.es - Test Suite

Comprehensive test suite for the QRRapido.es QR code generator.

## Test Coverage

The test suite covers:

- **Page Structure**: Verifies the HTML structure, title, headings, and UI elements
- **Dynamic Field Switching**: Tests the switching between different QR code types (URL, Text, Email, Phone, SMS, WiFi, vCard)
- **Size Selection**: Tests the QR code size selector (Small, Medium, Large)
- **QR Code Generation**: Tests generation for all QR code types with proper data formatting
- **Color Customization**: Tests custom color selection for QR codes
- **Download Functionality**: Tests the download feature for generated QR codes
- **Form Validation**: Tests validation and error messages for required fields
- **QR Code Regeneration**: Tests clearing and regenerating QR codes

## Installation

Install the test dependencies:

```bash
npm install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests with UI
```bash
npm run test:ui
```

This will open an interactive browser interface where you can see test results, coverage, and more.

### Run tests with coverage
```bash
npm run test:coverage
```

This will generate a coverage report in the `coverage` directory.

## Test Structure

### Main Test File: `index.test.js`

The test file includes the following test suites:

1. **Page Structure**
   - Validates page title and headings
   - Checks for all QR type options
   - Verifies feature cards are displayed

2. **Dynamic Field Switching**
   - Tests switching between different QR types
   - Verifies correct fields are shown/hidden

3. **Size Selection**
   - Tests default size selection
   - Tests size switching functionality

4. **QR Code Generation**
   - Tests for each QR type (URL, Text, Email, Phone, SMS, WiFi, vCard)
   - Validates data formatting
   - Tests validation and error handling

5. **Color Customization**
   - Tests default colors
   - Tests custom color application

6. **Download Functionality**
   - Tests download button state
   - Tests QR code download as PNG

## Technologies Used

- **Vitest**: Fast unit test framework
- **@testing-library/dom**: DOM testing utilities
- **@testing-library/user-event**: User interaction simulation
- **happy-dom**: Fast DOM implementation for testing
- **@testing-library/jest-dom**: Custom jest-dom matchers

## Mocking

The test suite includes a mock for the QRCode library to:
- Simulate QR code generation without external dependencies
- Test canvas creation and manipulation
- Test download functionality

## Test Examples

### Testing URL QR Code Generation
```javascript
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
```

### Testing WiFi QR Code Generation
```javascript
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
```

## Continuous Integration

These tests can be easily integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Run tests
  run: npm test

- name: Generate coverage
  run: npm run test:coverage
```

## Contributing

When adding new features to index.html:
1. Add corresponding tests in index.test.js
2. Ensure all tests pass
3. Maintain high test coverage
4. Update this README if needed

## Troubleshooting

### Tests failing with "Cannot find module"
Make sure you've installed all dependencies:
```bash
npm install
```

### Tests timing out
Increase the timeout in vitest.config.js:
```javascript
test: {
  testTimeout: 10000
}
```

### Coverage not generating
Make sure you have the v8 coverage provider installed (included in vitest).
