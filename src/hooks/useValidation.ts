import { useState, useCallback } from 'react';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface ValidationSchema {
  [key: string]: ValidationRule;
}

export interface ValidationErrors {
  [key: string]: string;
}

export const useValidation = (schema: ValidationSchema) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = useCallback((name: string, value: any): string | null => {
    const rule = schema[name];
    if (!rule) return null;

    if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return 'Este campo es requerido';
    }

    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return null;
    }

    if (rule.minLength && value.length < rule.minLength) {
      return `Debe tener al menos ${rule.minLength} caracteres`;
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      return `Debe tener máximo ${rule.maxLength} caracteres`;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return 'Formato inválido';
    }

    if (rule.custom) {
      return rule.custom(value);
    }

    return null;
  }, [schema]);

  const validate = useCallback((data: any): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(schema).forEach(name => {
      const error = validateField(name, data[name]);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(prev => {
      const newTouched = { ...prev };
      Object.keys(schema).forEach(name => {
        newTouched[name] = true;
      });
      return newTouched;
    });

    return isValid;
  }, [schema, validateField]);

  const validateSingle = useCallback((name: string, value: any): boolean => {
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error || undefined
    }));
    setTouched(prev => ({ ...prev, [name]: true }));
    return !error;
  }, [validateField]);

  const clearError = useCallback((name: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  return {
    errors,
    touched,
    validate,
    validateSingle,
    clearError,
    clearAllErrors,
    hasErrors: Object.keys(errors).length > 0,
    getFieldError: (name: string) => errors[name],
    isFieldTouched: (name: string) => touched[name] || false
  };
};

// Common validation patterns
export const ValidationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
};

// Common validation schemas
export const CommonSchemas = {
  login: {
    email: {
      required: true,
      pattern: ValidationPatterns.email
    },
    password: {
      required: true,
      minLength: 6
    }
  },
  contact: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 50
    },
    email: {
      required: true,
      pattern: ValidationPatterns.email
    },
    message: {
      required: true,
      minLength: 10,
      maxLength: 500
    }
  }
};
