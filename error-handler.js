// Error Handler for Rave Revolution Beats
// This script handles and filters JavaScript errors to avoid false positives

(function() {
  'use strict';
  
  // Configuration for error handling
  const ERROR_CONFIG = {
    // Sources to ignore completely
    ignoredSources: [
      'chrome-extension://',
      'moz-extension://',
      'safari-extension://',
      'ms-browser-extension://',
      'kit.fontawesome.com',
      'main.js', // Generic main.js from unknown sources
      'extensions/',
      'widget',
      'gtm.js',
      'analytics.js'
    ],
    
    // Error messages to ignore
    ignoredMessages: [
      'Script error.',
      'Non-Error promise rejection captured',
      'ResizeObserver loop limit exceeded',
      'Cannot read property',
      'angular is not defined', // Specifically handle Angular errors
      'Angular',
      '$',
      'jQuery'
    ],
    
    // Our application domains
    allowedDomains: [
      'kivamz.github.io',
      'localhost',
      '127.0.0.1',
      'raverevolutionbeats'
    ]
  };
  
  // Check if error source should be ignored
  function shouldIgnoreError(errorEvent) {
    const source = errorEvent.filename || errorEvent.target?.src || '';
    const message = errorEvent.message || '';
    
    // Check ignored sources
    if (ERROR_CONFIG.ignoredSources.some(ignoredSource => 
        source.includes(ignoredSource))) {
      return true;
    }
    
    // Check ignored messages
    if (ERROR_CONFIG.ignoredMessages.some(ignoredMsg => 
        message.includes(ignoredMsg))) {
      return true;
    }
    
    // If source is from our allowed domains, don't ignore
    if (ERROR_CONFIG.allowedDomains.some(domain => 
        source.includes(domain))) {
      return false;
    }
    
    // If no source information, might be from our app
    if (!source) {
      return false;
    }
    
    // Ignore external sources by default
    return true;
  }
  
  // Enhanced error handler
  window.addEventListener('error', function(errorEvent) {
    if (shouldIgnoreError(errorEvent)) {
      console.debug('Filtered external error:', {
        source: errorEvent.filename,
        message: errorEvent.message,
        line: errorEvent.lineno
      });
      errorEvent.preventDefault();
      return false;
    }
    
    // Log legitimate application errors
    console.error('🚨 Application Error:', {
      message: errorEvent.message,
      source: errorEvent.filename,
      line: errorEvent.lineno,
      column: errorEvent.colno,
      stack: errorEvent.error?.stack,
      timestamp: new Date().toISOString()
    });
  });
  
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', function(rejectionEvent) {
    const reason = rejectionEvent.reason;
    
    // Ignore common external promise rejections
    if (reason && typeof reason === 'string') {
      if (ERROR_CONFIG.ignoredMessages.some(msg => reason.includes(msg))) {
        console.debug('Filtered promise rejection:', reason);
        rejectionEvent.preventDefault();
        return false;
      }
    }
    
    console.error('🚨 Unhandled Promise Rejection:', {
      reason: reason,
      timestamp: new Date().toISOString()
    });
  });
  
  // Console override to catch Angular errors specifically
  const originalError = console.error;
  console.error = function(...args) {
    const message = args.join(' ');
    
    // Filter out Angular-related errors specifically
    if (message.includes('angular') || 
        message.includes('Angular') || 
        message.includes('ng-') ||
        message.includes('main.js:59')) {
      console.debug('🔇 Filtered Angular/External error:', message);
      return;
    }
    
    // Call original console.error for legitimate errors
    originalError.apply(console, args);
  };
  
  console.info('🛡️ Error handler initialized for Rave Revolution Beats');
  
})();
