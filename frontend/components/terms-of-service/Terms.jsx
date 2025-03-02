import { ArrowLeft, Music2 } from "lucide-react";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100'>
     
      {/* Main Content */}
      <main className='container mx-auto px-4 py-12 max-w-4xl'>
        <div className='bg-white rounded-xl shadow-md p-8 mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
            Terms of Service
          </h1>
          <p className='text-gray-600 mb-8'>
            Last Updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          <div className='space-y-8'>
            <section>
              <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                1. Introduction
              </h2>
              <p className='text-gray-600 mb-3'>
                Welcome to LyricFlip. These Terms of Service govern your use of
                our website, mobile application, and services.
              </p>
              <p className='text-gray-600 mb-3'>
                By accessing or using LyricFlip, you agree to be bound by these
                Terms. If you disagree with any part of the terms, you may not
                access the service.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                2. Definitions
              </h2>
              <ul className='list-disc pl-5 text-gray-600 space-y-2'>
                <li>
                  <strong>"Service"</strong> refers to the LyricFlip
                  application, website, and any related services.
                </li>
                <li>
                  <strong>"User"</strong> refers to individuals who access or
                  use our Service.
                </li>
                <li>
                  <strong>"Content"</strong> refers to text, images, music,
                  audio, video, and other materials that may appear on our
                  Service.
                </li>
              </ul>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                3. User Accounts
              </h2>
              <p className='text-gray-600 mb-3'>
                When you create an account with us, you must provide accurate,
                complete, and current information. Failure to do so constitutes
                a breach of the Terms, which may result in immediate termination
                of your account.
              </p>
              <p className='text-gray-600 mb-3'>
                You are responsible for safeguarding the password and for all
                activities that occur under your account.
              </p>
              <p className='text-gray-600 mb-3'>
                You agree not to disclose your password to any third party. You
                must notify us immediately upon becoming aware of any breach of
                security or unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                4. Intellectual Property
              </h2>
              <p className='text-gray-600 mb-3'>
                The Service and its original content, features, and
                functionality are and will remain the exclusive property of
                LyricFlip and its licensors.
              </p>
              <p className='text-gray-600 mb-3'>
                Our Service may allow you to post, link, store, share and
                otherwise make available certain information, text, graphics,
                videos, or other material. You retain any rights that you may
                have in such content.
              </p>
              <p className='text-gray-600 mb-3'>
                By posting content to the Service, you grant us the right to
                use, modify, publicly perform, publicly display, reproduce, and
                distribute such content on and through the Service.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                5. Music Content and Licensing
              </h2>
              <p className='text-gray-600 mb-3'>
                LyricFlip provides access to music content that is either owned
                by LyricFlip or licensed to LyricFlip by third-party rights
                holders.
              </p>
              <p className='text-gray-600 mb-3'>
                You may not download, reproduce, distribute, transmit,
                broadcast, display, sell, license, or otherwise exploit any
                music content for any other purposes without the prior written
                consent of LyricFlip or the respective licensors of the content.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                6. Prohibited Uses
              </h2>
              <p className='text-gray-600 mb-3'>
                You agree not to use the Service:
              </p>
              <ul className='list-disc pl-5 text-gray-600 space-y-2'>
                <li>
                  In any way that violates any applicable national or
                  international law or regulation.
                </li>
                <li>
                  To transmit, or procure the sending of, any advertising or
                  promotional material, including any "junk mail", "chain
                  letter," "spam," or any other similar solicitation.
                </li>
                <li>
                  To impersonate or attempt to impersonate LyricFlip, a
                  LyricFlip employee, another user, or any other person or
                  entity.
                </li>
                <li>
                  To engage in any other conduct that restricts or inhibits
                  anyone's use or enjoyment of the Service, or which may harm
                  LyricFlip or users of the Service.
                </li>
              </ul>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                7. Limitation of Liability
              </h2>
              <p className='text-gray-600 mb-3'>
                In no event shall LyricFlip, nor its directors, employees,
                partners, agents, suppliers, or affiliates, be liable for any
                indirect, incidental, special, consequential or punitive
                damages, including without limitation, loss of profits, data,
                use, goodwill, or other intangible losses, resulting from your
                access to or use of or inability to access or use the Service.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                8. Termination
              </h2>
              <p className='text-gray-600 mb-3'>
                We may terminate or suspend your account immediately, without
                prior notice or liability, for any reason whatsoever, including
                without limitation if you breach the Terms.
              </p>
              <p className='text-gray-600 mb-3'>
                Upon termination, your right to use the Service will immediately
                cease. If you wish to terminate your account, you may simply
                discontinue using the Service.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                9. Changes
              </h2>
              <p className='text-gray-600 mb-3'>
                We reserve the right, at our sole discretion, to modify or
                replace these Terms at any time. If a revision is material we
                will try to provide at least 30 days' notice prior to any new
                terms taking effect.
              </p>
              <p className='text-gray-600 mb-3'>
                By continuing to access or use our Service after those revisions
                become effective, you agree to be bound by the revised terms. If
                you do not agree to the new terms, please stop using the
                Service.
              </p>
            </section>

          
          </div>
        </div>

        {/* Acceptance Section */}
        <div className='bg-white rounded-xl shadow-md p-8 text-center'>
          <h2 className='text-xl font-semibold text-gray-800 mb-4'>
            Acceptance of Terms
          </h2>
          <p className='text-gray-600 mb-6'>
            By using LyricFlip, you acknowledge that you have read and
            understood these Terms of Service and agree to be bound by them.
          </p>
          <button className='bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-full transition-colors'>
            I Accept
          </button>
        </div>
      </main>

      {/* Footer */}
    </div>
  );
}
