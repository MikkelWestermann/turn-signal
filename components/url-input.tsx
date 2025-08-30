'use client';

import * as React from 'react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Lock, AlertCircle, CheckCircle2 } from 'lucide-react';

interface UrlInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  helpText?: string;
}

export function UrlInput({
  value,
  onChange,
  placeholder = 'example.com/path',
  label,
  error,
  required = false,
  disabled = false,
  className,
  helpText,
}: UrlInputProps) {
  const [inputValue, setInputValue] = useState(() => {
    return value ? value.replace(/^https?:\/\//, '') : '';
  });
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);

    if (!newValue.trim()) {
      setIsValid(null);
      onChange('');
      return;
    }

    try {
      newValue = newValue.replace(/^https?:\/\//, '');
      const fullUrl = `https://${newValue}`;
      const url = new URL(fullUrl);

      if (url.hostname.includes('..') || url.hostname.endsWith('.')) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
      onChange(fullUrl);
    } catch {
      setIsValid(false);
      onChange(`https://${newValue}`);
    }
  };

  const getValidationIcon = () => {
    if (isValid === null || !inputValue.trim()) return null;
    if (isValid) return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    return <AlertCircle className="h-4 w-4 text-red-500" />;
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <div className="flex items-center gap-2">
          <Label htmlFor="url-input" className="text-sm font-medium">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </Label>
          {helpText && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Help"
                >
                  <AlertCircle className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{helpText}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      )}

      <div
        className={cn(
          'flex rounded-md border border-input bg-transparent shadow-xs transition-colors',
          isFocused && 'ring-[3px] ring-ring/50',
          isValid === false && 'border-red-500',
          error && 'border-red-500',
        )}
      >
        <div
          className={cn(
            'flex h-9 items-center gap-2 rounded-l-md border-r bg-muted/30 px-3 font-mono text-sm font-medium text-muted-foreground transition-colors',
            isFocused ? 'border-ring' : 'border-input',
          )}
        >
          <Lock className="h-3 w-3 text-green-600" />
          https://
        </div>

        <div className="relative flex-1">
          <Input
            id="url-input"
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              'h-9 rounded-none border-0 pr-10 pl-4 shadow-none',
              'focus-visible:ring-0 focus-visible:ring-offset-0',
              'bg-transparent',
            )}
            aria-invalid={isValid === false || !!error}
            aria-describedby={error ? 'url-error' : undefined}
          />

          {getValidationIcon() && (
            <div className="absolute top-1/2 right-3 -translate-y-1/2">
              {getValidationIcon()}
            </div>
          )}
        </div>
      </div>

      {error && (
        <p
          id="url-error"
          className="flex items-center gap-1 text-sm text-red-600"
        >
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}

      {!error && (
        <p className="text-xs text-muted-foreground">
          Enter the domain and path (e.g., example.com/docs or myapp.com)
        </p>
      )}
    </div>
  );
}
