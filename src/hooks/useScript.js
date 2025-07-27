import {
      useState,
      useEffect
    } from 'react';
    export const useScript = (src, options) => {
      const [status, setStatus] = useState(src ? 'loading' : 'idle');
      useEffect(() => {
        if (!src) {
          setStatus('idle');
          return;
        }
        let script = document.querySelector(`script[src="${src}"]`);
        if (!script) {
          script = document.createElement('script');
          script.src = src;
          script.async = options ?.async === false ? false : true;
          script.defer = options ?.defer === false ? false : true;
          if (options ?.id) script.id = options.id;
          document.body.appendChild(script);
          const setAttributeFromEvent = (event) => {
            script.setAttribute('data-status', event.type === 'load' ? 'ready' : 'error');
          };
          script.addEventListener('load', setAttributeFromEvent);
          script.addEventListener('error', setAttributeFromEvent);
        } else {
          setStatus(script.getAttribute('data-status') || 'ready');
        }
        const setStateFromEvent = (event) => {
          setStatus(event.type === 'load' ? 'ready' : 'error');
        };
        script.addEventListener('load', setStateFromEvent);
        script.addEventListener('error', setStateFromEvent);
        return () => {
          if (script) {
            script.removeEventListener('load', setStateFromEvent);
            script.removeEventListener('error', setStateFromEvent);
          }
        };
      }, [src, options]);
      return status;
    };