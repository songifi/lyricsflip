import Link from "next/link"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <main className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-500">Last Updated: February 28, 2025</p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Contents</h2>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {sections.map((section) => (
                <li key={section.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <a href={`#${section.id}`} className="text-indigo-600 hover:text-indigo-800">
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
              </div>
              <div className="px-4 py-5 sm:p-6 text-gray-700 space-y-4">{section.content}</div>
            </section>
          ))}
        </div>

        <footer className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:privacy@musicgameapp.com" className="text-indigo-600 hover:text-indigo-800">
              privacy@musicgameapp.com
            </a>
          </p>
          <div className="mt-4 space-x-4">
            <Link href="/" className="text-sm text-indigo-600 hover:text-indigo-800">
              Home
            </Link>
            <Link href="/terms" className="text-sm text-indigo-600 hover:text-indigo-800">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-sm text-indigo-600 hover:text-indigo-800">
              Contact Us
            </Link>
          </div>
        </footer>
      </main>
    </div>
  )
}

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    content: (
      <>
        <p className="mb-4">
          Welcome to our Music Game App. We respect your privacy and are committed to protecting your personal data.
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our
          music game application.
        </p>
        <p>
          Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please
          do not access the application.
        </p>
      </>
    ),
  },
  {
    id: "information-collection",
    title: "Information We Collect",
    content: (
      <>
        <p className="mb-4">
          We may collect several types of information from and about users of our application, including:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Personal Information:</strong> This includes your name, email address, and profile information that
            you provide when creating an account.
          </li>
          <li>
            <strong>Usage Data:</strong> Information about how you interact with our application, including game scores,
            achievements, music preferences, and gameplay statistics.
          </li>
          <li>
            <strong>Device Information:</strong> We collect information about your device, including device type,
            operating system, unique device identifiers, and mobile network information.
          </li>
          <li>
            <strong>Location Data:</strong> With your consent, we may collect and process information about your
            approximate location to provide location-based features.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "information-use",
    title: "How We Use Your Information",
    content: (
      <>
        <p className="mb-4">We use the information we collect for various purposes, including:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>To provide and maintain our service, including to monitor the usage of our application.</li>
          <li>To manage your account and provide you with customer support.</li>
          <li>To improve our application and user experience.</li>
          <li>To personalize your experience and deliver content and game features relevant to your interests.</li>
          <li>To process and deliver contest entries and rewards.</li>
          <li>To send you updates, security alerts, and support messages.</li>
          <li>To communicate with you about new features, products, or services.</li>
          <li>To prevent, detect, and address technical issues and fraudulent activities.</li>
        </ul>
      </>
    ),
  },
  {
    id: "information-sharing",
    title: "Information Sharing and Disclosure",
    content: (
      <>
        <p className="mb-4">We may share your information in the following situations:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>With Service Providers:</strong> We may share your information with third-party vendors, service
            providers, and partners who perform services for us or on our behalf.
          </li>
          <li>
            <strong>For Business Transfers:</strong> We may share or transfer your information in connection with, or
            during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of
            our business to another company.
          </li>
          <li>
            <strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with
            your consent.
          </li>
          <li>
            <strong>With Other Users:</strong> When you share personal information or otherwise interact in the public
            areas with other users, such information may be viewed by all users and may be publicly distributed.
          </li>
          <li>
            <strong>For Legal Requirements:</strong> We may disclose your information where required to do so by law or
            in response to valid requests by public authorities.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "user-rights",
    title: "Your Rights and Choices",
    content: (
      <>
        <p className="mb-4">
          You have certain rights regarding your personal information. Depending on your location, these rights may
          include:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>The right to access and receive a copy of your personal information.</li>
          <li>The right to rectify or update your personal information.</li>
          <li>The right to erase your personal information.</li>
          <li>The right to restrict the processing of your personal information.</li>
          <li>The right to object to the processing of your personal information.</li>
          <li>The right to data portability.</li>
          <li>The right to withdraw consent.</li>
        </ul>
        <p className="mt-4">
          You can exercise these rights by contacting us using the contact information provided at the end of this
          Privacy Policy.
        </p>
      </>
    ),
  },
  {
    id: "data-security",
    title: "Data Security",
    content: (
      <>
        <p className="mb-4">
          We have implemented appropriate technical and organizational security measures designed to protect the
          security of any personal information we process. However, please also remember that we cannot guarantee that
          the internet itself is 100% secure.
        </p>
        <p>
          Although we will do our best to protect your personal information, transmission of personal information to and
          from our application is at your own risk. You should only access the application within a secure environment.
        </p>
      </>
    ),
  },
  {
    id: "children-privacy",
    title: "Children's Privacy",
    content: (
      <p>
        Our application is not intended for children under the age of 13. We do not knowingly collect personally
        identifiable information from children under 13. If you are a parent or guardian and you are aware that your
        child has provided us with personal information, please contact us so that we can take necessary actions.
      </p>
    ),
  },
  {
    id: "policy-changes",
    title: "Changes to This Privacy Policy",
    content: (
      <>
        <p className="mb-4">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
        </p>
        <p>
          You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are
          effective when they are posted on this page.
        </p>
      </>
    ),
  },
  {
    id: "contact-us",
    title: "Contact Us",
    content: (
      <>
        <p className="mb-4">If you have any questions about this Privacy Policy, you can contact us:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>By email: privacy@lyricflip.com</li>
          <li>By visiting the contact page on our website</li>
          <li>By mail: lyricFlip, 123 Privacy Street, App City, AC 12345</li>
        </ul>
      </>
    ),
  },
]


