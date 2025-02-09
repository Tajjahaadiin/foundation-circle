import errorImage from '@/assets/404.svg';
export default function ErrorRoute() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        margin: '0 auto',
        backgroundColor: 'lavender',
        gap: '50px',
      }}
    >
      <img width={'50%'} src={errorImage} alt="error Image" style={{}} />
      <h1 style={{ textAlign: 'center' }}>Page not found</h1>
    </div>
  );
}
