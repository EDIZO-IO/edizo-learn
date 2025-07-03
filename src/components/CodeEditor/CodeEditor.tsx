import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import { motion } from 'framer-motion';
import { Play, Copy, Download, Maximize2 } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';
import { toast } from 'react-hot-toast';

interface CodeEditorProps {
  language: 'javascript' | 'html' | 'css' | 'python';
  initialCode?: string;
  onRun?: (code: string) => void;
  height?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  initialCode = '',
  onRun,
  height = '300px'
}) => {
  const { isDark } = useThemeStore();
  const [code, setCode] = useState(initialCode);

  const getLanguageExtension = () => {
    switch (language) {
      case 'javascript':
        return javascript();
      case 'html':
        return html();
      case 'css':
        return css();
      case 'python':
        return python();
      default:
        return javascript();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard!');
  };

  const handleDownload = () => {
    const fileExtensions = {
      javascript: 'js',
      html: 'html',
      css: 'css',
      python: 'py'
    };
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${fileExtensions[language]}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`rounded-lg border ${
      isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
    } overflow-hidden`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-2 border-b ${
        isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className={`text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {language.charAt(0).toUpperCase() + language.slice(1)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {onRun && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onRun(code)}
              className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
              title="Run Code"
            >
              <Play className="w-4 h-4" />
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className={`p-2 rounded-lg transition-colors ${
              isDark
                ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            title="Copy Code"
          >
            <Copy className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className={`p-2 rounded-lg transition-colors ${
              isDark
                ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            title="Download Code"
          >
            <Download className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Editor */}
      <CodeMirror
        value={code}
        height={height}
        theme={isDark ? oneDark : undefined}
        extensions={[getLanguageExtension()]}
        onChange={(value) => setCode(value)}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          dropCursor: false,
          allowMultipleSelections: false,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          highlightSelectionMatches: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;