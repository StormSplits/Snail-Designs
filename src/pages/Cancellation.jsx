import React from "react";
import SEO from "../components/SEO";

export const Cancellation = () => {
    return (
        <>
            <SEO
                title="Cancellation & Refund Policy"
                description="Cancellation and refund policy for Snail Designs services."
                keywords="cancellation policy, refund policy, terms of service"
                url="https://snaildesigns.com/cancellation"
            />
            <div className="container mx-auto px-4 py-20 lg:py-32 text-gray-200 font-CircularBook">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
                        Cancellation & Refund Policy
                    </h1>

                    <div className="space-y-6 text-lg leading-relaxed">
                        <p><strong>Last Updated:</strong> 04 February 2026<br /><strong>Company Name:</strong> Snail Designs</p>

                        <h2 className="text-2xl font-bold text-white mt-8">1. Purpose of This Policy</h2>
                        <p>This Cancellation & Refund Policy outlines the terms governing cancellation of services, project termination, rescheduling, and eligibility for refunds for services offered by Snail Designs, an India-based service provider. This policy applies to all clients, customers, and users who engage our services through our website, proposals, contracts, or invoices.</p>
                        <p>By engaging our services, you acknowledge and agree to this policy.</p>

                        <h2 className="text-2xl font-bold text-white mt-8">2. Scope of Services Covered</h2>
                        <p>This policy applies to all paid services including but not limited to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Website & software development</li>
                            <li>UI/UX design services</li>
                            <li>AI and technology solutions</li>
                            <li>Consulting and advisory services</li>
                            <li>Digital marketing services</li>
                            <li>Retainer agreements</li>
                            <li>Subscription services</li>
                            <li>Maintenance and support packages</li>
                            <li>Custom project engagements</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-white mt-8">3. Client-Initiated Cancellation</h2>

                        <h3 className="text-xl font-bold text-white mt-4">3.1 Before Project Commencement</h3>
                        <p>If cancellation is requested before work has commenced, the client may be eligible for a refund after deduction of:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Consultation fees</li>
                            <li>Proposal preparation costs</li>
                            <li>Administrative charges</li>
                            <li>Payment gateway charges</li>
                            <li>Taxes already paid or payable (GST where applicable)</li>
                        </ul>

                        <h3 className="text-xl font-bold text-white mt-4">3.2 After Project Commencement</h3>
                        <p>Once the project has started, cancellation will be treated as early termination.</p>
                        <p>In such cases:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Payments already made are non-refundable</li>
                            <li>The client is liable to pay for work completed up to the cancellation date</li>
                            <li>Work effort is calculated based on:
                                <ul className="list-circle pl-6 mt-2 space-y-1">
                                    <li>Time spent</li>
                                    <li>Milestones achieved</li>
                                    <li>Resources allocated</li>
                                    <li>Third-party costs incurred</li>
                                </ul>
                            </li>
                            <li>Deliverables completed until that stage may be provided upon settlement of dues</li>
                        </ul>

                        <h3 className="text-xl font-bold text-white mt-4">3.3 After Milestone Approval</h3>
                        <p>Where milestone-based delivery is used:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Approved milestones are final and billable</li>
                            <li>No refunds will be issued for approved milestones</li>
                            <li>Cancellation only applies to future unpaid milestones</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-white mt-8">4. Retainer & Subscription Services</h2>
                        <p>For monthly or recurring services:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>A written cancellation notice of 15 days is required</li>
                            <li>No partial refunds for ongoing billing cycles</li>
                            <li>Services will continue until the billing period ends</li>
                            <li>Unused hours or services are not refundable unless contractually stated</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-white mt-8">5. Custom & Made-to-Order Work</h2>
                        <p>All custom services are non-refundable, including:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Custom development</li>
                            <li>Tailored design work</li>
                            <li>Strategy consulting</li>
                            <li>AI model configuration</li>
                            <li>Integration work</li>
                        </ul>
                        <p>This is because resources are exclusively allocated and work cannot be resold.</p>

                        <h2 className="text-2xl font-bold text-white mt-8">6. Company-Initiated Cancellation</h2>
                        <p>We reserve the right to suspend or cancel services if:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Client fails to make payments</li>
                            <li>Client breaches contract terms</li>
                            <li>Required information is not provided</li>
                            <li>Client engages in abusive or unlawful conduct</li>
                            <li>Project becomes technically or legally unfeasible</li>
                            <li>Force majeure events occur</li>
                        </ul>
                        <p>In such cases:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Work completed will be invoiced</li>
                            <li>No obligation for full refund</li>
                            <li>Partial refund may be issued at company discretion</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-white mt-8">7. Delay Due to Client Inaction</h2>
                        <p>If the client fails to provide required inputs, approvals, or materials for <strong>more than 15 days:</strong></p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Project may be placed on hold</li>
                            <li>Restart may incur additional charges</li>
                            <li>No refunds will be issued due to delay caused by client</li>
                            <li>Long inactivity may be treated as cancellation</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-white mt-8">8. Third-Party Costs</h2>
                        <p>No refunds will be issued for third-party expenses including:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Domain purchases</li>
                            <li>Hosting fees</li>
                            <li>Software licenses</li>
                            <li>API usage</li>
                            <li>Cloud charges</li>
                            <li>Advertising spends</li>
                            <li>Plugin or theme purchases</li>
                        </ul>
                        <p>These are governed by respective third-party policies.</p>

                        <h2 className="text-2xl font-bold text-white mt-8">9. Refund Eligibility Conditions</h2>
                        <p>Refunds, if approved, are subject to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Written request submitted via official email</li>
                            <li>Valid justification</li>
                            <li>Compliance with contract terms</li>
                            <li>No violation of usage terms</li>
                            <li>No intellectual property misuse</li>
                        </ul>
                        <p>Refund approval is at sole discretion of Snail Designs management unless otherwise stated in a signed agreement.</p>

                        <h2 className="text-2xl font-bold text-white mt-8">10. Refund Processing</h2>
                        <p>If a refund is approved:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Processed within 7–21 business days</li>
                            <li>Issued through original payment method where possible</li>
                            <li>Subject to deduction of:
                                <ul className="list-circle pl-6 mt-2 space-y-1">
                                    <li>GST and statutory taxes (non-refundable where already remitted)</li>
                                    <li>Payment gateway charges</li>
                                    <li>Currency conversion fees (if applicable)</li>
                                </ul>
                            </li>
                        </ul>

                        <h2 className="text-2xl font-bold text-white mt-8">11. No Refund Situations</h2>
                        <p>Refunds will not be issued in cases of:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Change of mind</li>
                            <li>Business decision changes</li>
                            <li>Market performance dissatisfaction</li>
                            <li>Delay caused by client</li>
                            <li>Scope change after approval</li>
                            <li>Approved design or feature rejection</li>
                            <li>Completed consultation sessions</li>
                            <li>Strategy or advisory delivery</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-white mt-8">12. Force Majeure</h2>
                        <p>Neither party shall be liable for cancellation or delay due to events beyond reasonable control, including:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Natural disasters</li>
                            <li>Government restrictions</li>
                            <li>Internet outages</li>
                            <li>War or civil disturbance</li>
                            <li>Regulatory changes</li>
                            <li>Pandemic situations</li>
                        </ul>
                        <p>Refunds in such cases are evaluated case-by-case.</p>

                        <h2 className="text-2xl font-bold text-white mt-8">13. Dispute Resolution (India)</h2>
                        <p>This policy shall be governed by the laws of India.</p>
                        <p>Any disputes shall be subject to the jurisdiction of courts located in:</p>
                        <p>Lucknow, Uttar Pradesh, India</p>
                        <p>Parties agree to first attempt resolution through mutual discussion before legal action.</p>

                        <h2 className="text-2xl font-bold text-white mt-8">14. Policy Updates</h2>
                        <p>We reserve the right to update this policy at any time. Updated versions will be posted on our website with a revised effective date.</p>

                        <h2 className="text-2xl font-bold text-white mt-8">15. Contact for Cancellation Requests</h2>
                        <p>All cancellation requests must be sent to:</p>
                        <p><strong>Snail Designs</strong><br />
                            Lucknow, Uttar Pradesh, India<br />
                            Email: <a href="mailto:designssnail@gmail.com" className="text-purple-400 hover:text-purple-300">designssnail@gmail.com</a></p>
                    </div>
                </div>
            </div>
        </>
    );
};
