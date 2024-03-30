import { Toaster } from 'react-hot-toast';
import { useDarkModeContext } from '../context/DarkModeContext';

function ToasterWrapper() {
  const { dark } = useDarkModeContext();

  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{ margin: '8px' }}
      toastOptions={{
        success: { duration: 3000 },
        error: { duration: 5000 },
        style: !dark
          ? {
              fontSize: '16px',
              padding: '16px 24px',
              backgroundColor: '#fafafa',
              color: '#404040',
            }
          : {
              fontSize: '16px',
              padding: '16px 24px',
              backgroundColor: '#171717',
              color: '#fafafa',
            },
      }}
    />
  );
}

export default ToasterWrapper;
