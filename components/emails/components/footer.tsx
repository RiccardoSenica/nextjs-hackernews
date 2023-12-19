import { getRandomColor } from '../../../utils/getRandomColor';

export function Footer() {
  const background = getRandomColor();

  return (
    <footer
      className='mt-8 bg-blue-200 pt-6 text-black'
      style={{ backgroundColor: `${background}` }}
    >
      <div className='ml-8 flex items-center justify-between pb-4'>
        <div>
          <h4 className='text-lg font-semibold'>Contact Us</h4>
          <p>{process.env.NEXT_PUBLIC_BRAND_NAME}</p>
          <p>
            Email:{' '}
            <a href={`mailto:${process.env.NEXT_PUBLIC_BRAND_EMAIL}`}>
              Email: {process.env.NEXT_PUBLIC_BRAND_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
