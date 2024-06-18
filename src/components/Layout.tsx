import { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { useUser } from '@auth0/nextjs-auth0/client';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const { user, isLoading } = useUser();

  useEffect(() => {
    // Import Bootstrap JS
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  // @ts-ignore: Roles is an array, not an object.
  const isAdmin = user?.['roleType']?.includes('Admin');

  return (
    <>
      <Head>
        <title>Words in Stone</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="layout-container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href="/">Words in Stone</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about">About</a>
                </li>
                {user && !isLoading ? (
                  <>
                    <li className="nav-item">
                      <a className="nav-link" href="/profile">Profile</a>
                    </li>
                    {isAdmin && (
                      <li className="nav-item">
                        <a className="nav-link" href="/admin">Admin</a>
                      </li>
                    )}
                    <li className="nav-item">
                      <a className="nav-link" href="/api/auth/logout">Logout</a>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <a className="nav-link" href="/api/auth/login">Login</a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <main className="main-content">{children}</main>
      </div>
    </>
  );
}
