import React from "react";
import SEO from "../components/SEO";

export const Privacy = () => {
    return (
        <>
            <SEO
                title="Privacy Policy"
                description="Privacy Policy for Snail Designs. Learn how we collect, use, and protect your personal data."
                keywords="privacy policy, data protection, personal data"
                url="https://snaildesigns.com/privacy"
            />
            <div className="container mx-auto px-4 py-20 lg:py-32 text-gray-200 font-CircularBook">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
                        Privacy Policy
                    </h1>

                    <div className="space-y-6 text-lg leading-relaxed">
                        <p><strong>Last Updated:</strong> 04 February 2026<br /><strong>Company Name:</strong> Snail Designs</p>

                        <h2 className="text-2xl font-bold text-white mt-8">1. Introduction</h2>
                        <p>Snail Designs (“Company”, “we”, “our”, “us”) is committed to protecting and respecting your privacy and personal data. This Privacy Policy explains how we collect, use, store, disclose, and safeguard personal data when you visit our website, interact with us, or use our services.</p>
                        <p>This policy is issued in accordance with applicable Indian data protection laws, including the Digital Personal Data Protection Act, 2023, and applicable international privacy standards where relevant.</p>
                        <p>By accessing our website or using our services, you agree to the practices described in this Privacy Policy.</p>

                        <h2 className="text-2xl font-bold text-white mt-8">2. Definitions</h2>
                        <p><strong>Personal Data:</strong> Any information relating to an identified or identifiable individual.</p>
                        <p><strong>Processing:</strong> Collection, storage, use, sharing, or deletion of personal data.</p>
                        <p><strong>User / You:</strong> Any individual or entity accessing our website or services.</p>

                        <h2 className="text-2xl font-bold text-white mt-8">3. Data We Collect</h2>
                        <p>We may collect the following categories of personal data:</p>

                        <h3 className="text-xl font-bold text-white mt-4">3.1 Information You Provide Directly</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Full name</li>
                            <li>Email address</li>
                            <li>Phone number</li>
                            <li>Company name</li>
                            <li>Job title</li>
                            <li>Billing details</li>
                            <li>Project requirements</li>
                            <li>Communication content</li>
                            <li>Documents you submit</li>
                        </ul>

                        <h3 className="text-xl font-bold text-white mt-4">3.2 Automatically Collected Data</h3>
                        <p>When you visit our website, we may automatically collect:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>IP address</li>
                            <li>Browser type and version</li>
                            <li>Device information</li>
                            <li>Pages visited</li>
                            <li>Date and time of visit</li>
                            <li>Referral sources</li>
                            <li>Usage behaviour</li>
                        </ul>

                        <h3 className="text-xl font-bold text-white mt-4">3.3 Transaction & Service Data</h3>
                        <p>If you purchase services:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Payment records</li>
                            <li>Invoice details</li>
                            <li>Service history</li>
                            <li>Contract information</li>
                        </ul>
                        <p>(We do not store full card details; payments are processed by secure third-party gateways.)</p>

                        <h2 className="text-2xl font-bold text-white mt-8">4. Lawful Basis & Purpose of Processing</h2>
                        <p>We process personal data only for lawful purposes, including:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Providing and delivering services</li>
                            <li>Responding to inquiries and requests</li>
                            <li>Preparing proposals and contracts</li>
                            <li>Client communication</li>
                            <li>Payment processing</li>
                            <li>Account management</li>
                            <li>Website improvement and analytics</li>
                            <li>Legal and regulatory compliance</li>
                            <li>Fraud prevention and security</li>
                            <li>Marketing communications (with consent where required)</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-white mt-8">5. Consent</h2>
                        <p>Where required, we collect and process personal data based on your consent. You may withdraw consent at any time by contacting us. Withdrawal does not affect processing already completed lawfully.</p>

                        <h2 className="text-2xl font-bold text-white mt-8">6. Cookies & Tracking Technologies</h2>
                        <p>We use cookies and similar technologies to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Improve website performance</li>
                            <li>Analyse traffic patterns</li>
                            <li>Enhance user experience</li>
                            <li>Remember preferences</li>
                        </ul>
                        <p>You may disable cookies in your browser settings. Some website features may not function properly if cookies are disabled.</p>

                        <h2 className="text-2xl font-bold text-white mt-8">7. Data Sharing & Disclosure</h2>
                        <p>We do not sell personal data. We may share data only, when necessary, with:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Payment processors</li>
                            <li>Cloud hosting providers</li>
                            <li>Analytics providers</li>
                            <li>CRM and communication platforms</li>
                            <li>Professional advisors (legal, accounting)</li>
                            <li>Government authorities when legally required</li>
                        </ul>
                        <p>All third-party processors are required to maintain reasonable data protection safeguards.</p>

                        <h2 className="text-2xl font-bold text-white mt-8">8. Cross-Border Data Transfers</h2>
                        <p>If services involve international vendors or cloud systems, personal data may be processed outside India. In such cases, we ensure reasonable safeguards and contractual protections are in place.</p>

                        <h2 className="text-2xl font-bold text-white mt-8">9. Data Retention</h2>
                        <p>We retain personal data only for as long as necessary to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Fulfil service purposes</li>
                            <li>Meet legal obligations</li>
                            <li>Resolve disputes</li>
                            <li>Enforce agreements</li>
                        </ul>
                        <p>When data is no longer required, it is securely deleted or anonymized.</p>

                        <h2 className="text-2xl font-bold text-white mt-8">10. Data Security Measures</h2>
                        <p>We implement reasonable technical and organizational safeguards, including:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Secure servers and hosting</li>
                            <li>Access controls</li>
                            <li>Encryption where applicable</li>
                            <li>Restricted employee access</li>
                            <li>Secure communication channels</li>
                            <li>Regular security reviews</li>
                        </ul>
                        <p>However, no internet transmission is completely secure. Users share information at their own risk.</p>

                        <h2 className="text-2xl font-bold text-white mt-8">11. Your Rights (Under Indian DPDP Principles)</h2>
                        <p>Subject to applicable law, you may have the right to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Request access to your personal data</li>
                            <li>Request correction or updating</li>
                            <li>Request deletion of data</li>
                            <li>Withdraw consent</li>
                            <li>Request grievance redressal</li>
                            <li>Nominate a representative (where applicable)</li>
                        </ul>
                        <p>Requests can be made using the contact details below.</p>

                        <h2 className="text-2xl font-bold text-white mt-8">12. Children’s Privacy</h2>
                        <p>Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal data from children. If discovered, such data will be deleted.</p>

                        <h2 className="text-2xl font-bold text-white mt-8">13. Third-Party Links</h2>
                        <p>Our website may contain links to third-party websites. We are not responsible for their privacy practices or content. Users should review third-party privacy policies independently.</p>

                        <h2 className="text-2xl font-bold text-white mt-8">14. Marketing Communications</h2>
                        <p>We may send service updates or marketing communications where permitted by law. You may opt out at any time using unsubscribe links or by contacting us.</p>

                        <h2 className="text-2xl font-bold text-white mt-8">15. Grievance Officer (India Compliance Section)</h2>
                        <p>In accordance with Indian data protection requirements, you may contact our designated Grievance Officer:</p>
                        <p><strong>Name:</strong> Gufran Khan<br />
                            <strong>Email:</strong> <a href="mailto:designssnail@gmail.com" className="text-purple-400 hover:text-purple-300">designssnail@gmail.com</a><br />
                            <strong>Address:</strong> Lucknow, Uttar Pradesh, India</p>
                        <p>We will respond within a reasonable time as required by law.</p>

                        <h2 className="text-2xl font-bold text-white mt-8">16. Policy Updates</h2>
                        <p>We may update this Privacy Policy periodically. Updated versions will be posted on our website with the revised effective date. Continued use of services indicates acceptance of the updated policy.</p>

                        <h2 className="text-2xl font-bold text-white mt-8">17. Contact Information</h2>
                        <p>For privacy-related questions or requests:</p>
                        <p><strong>Snail Designs</strong><br />
                            Lucknow, Uttar Pradesh, India<br />
                            Email: <a href="mailto:designssnail@gmail.com" className="text-purple-400 hover:text-purple-300">designssnail@gmail.com</a></p>
                    </div>
                </div>
            </div>
        </>
    );
};
