import Head from 'next/head';
import Footer from '@/components/Footer';
import Image from 'next/image';
import MyCalendar from '../components/Calendar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Head>
        <title>{"SF Events Page"}</title>
      </Head>
      <section>
      <div className="p-4 max-w-base mx-auto bg-violet-500 font-bold font-sans text-4xl space-x-4 text-center">
        <h1>SF Events Page</h1>
      </div>
      </section>
      <MyCalendar />
      <Footer />
    </main>
  );
}

