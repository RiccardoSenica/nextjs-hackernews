import { ReactNode, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../../components/ui/card';
import Footer from './footer';

type CustomCardProps = {
  title: string;
  description?: string;
  content: ReactNode;
  style?: string;
  footer?: boolean;
};

export const CustomCard = ({
  title,
  description,
  content,
  style,
  footer = true
}: CustomCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return null;
  }

  if (isMobile) {
    console.log(isMobile);
    return (
      <Card className={`max-h-[90vh] w-[90%] p-4`}>
        <CardHeader className='text-center'>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className='max-h-[60vh] overflow-auto'>
          {content}
        </CardContent>
        {footer && (
          <CardFooter className='flex justify-center p-4'>
            <Footer />
          </CardFooter>
        )}
      </Card>
    );
  }

  return (
    <Card className={`${style ?? 'sm:w-2/3 md:w-2/5 lg:w-1/3 xl:w-1/4'} p-4`}>
      <CardHeader className='text-center'>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='h-[80%] flex-grow overflow-auto'>
        {content}
      </CardContent>
      {footer && (
        <CardFooter className=' flex justify-center p-4'>
          <Footer />
        </CardFooter>
      )}
    </Card>
  );
};
