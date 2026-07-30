import React from "react";
import { Container } from "reactstrap";
import { getSize } from "../../../constants";
import Communications from "../General/Communications";
import TermContent from "../General/TermContent";
import Termination from "../General/Termination";
import External from "../General/External";
import Applicable from "../General/Applicable";
import Indemnification from "../General/Indemnification";
import Revision from "../General/Revision";
import Law from "../General/Law";

const Conditions = () => {
  return (
    <React.Fragment>
      <section className="section">
        <Container
          fluid
          className=""
          style={{
            maxWidth: getSize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div>
            <h3
              style={{
                fontWeight: 900,
                fontSize: window.innerWidth > 562 ? "40px" : "36px",
              }}
              className="text-center mt-5 mb-5"
            >
              {" "}
              Terms &amp; Conditions
            </h3>
            <p className="text-dark fs-18">
              Itrust Investment LLC (“Itrust Investment ”), a wholly-owned
              subsidiary of Itrust Asset Management a member of the Financial
              Industry Regulatory Authority (FINRA). With FINRA number is
              164193, and the SEC number is 801-115048, that provides online and
              mobile application-based discount stock brokerage services to
              self-directed investors.
            </p>
            <p className="text-dark fs-18">
              These Terms and Conditions are in addition to any other agreements
              between you and Itrust Investment (collectively, “Itrust”),
              including any customer or account agreements and any other
              agreements that govern your use of software, products, goods,
              services, content, tools, and information provided by Itrust.
            </p>
            <div>
              <h4 className="fs-18" style={{ fontWeight: 800 }}>
                General
              </h4>
              <p className="text-dark fs-18">
                The Itrust website and mobile application (collectively, the
                “Service”) may include or make available certain content (the
                “Content”). Content includes, without limitation: (1) account
                positions, balances, transactions, confirmations, and order
                history; (2) general news and information, commentary, research
                reports, educational material and information and data
                concerning the financial markets, securities and other subjects;
                (3) market data1 such as quotations for securities transactions
                and/or last sale information for completed securities
                transactions reported in accordance with federal securities
                regulations; (4) financial and investment interactive tools,
                such as alerts or calculators; (5) tax preparation, bill payment
                and account management tools; (6) company names, logos, product
                and service names, trade names, trademarks and services marks
                (collectively, “Marks”) owned by Itrust, and Marks owned by
                Third Party Providers (defined below); and (7) any other
                information, content, services, or software. Certain Content is
                furnished by third parties (each, a “Third-Party Provider” and
                collectively, the “Third-Party Providers”). Such Content (“Third
                Party Content”) includes, without limitation, any information,
                content, service or software made available by or through social
                media websites, blogs, wikis, online conferences, telecasts,
                podcasts, and other forums (collectively, the “Forums”). Third
                Party Content may be available through framed areas or through
                hyperlinks to the Third-Party Providers’ websites
              </p>
            </div>
            <div>
              <h4 className="fs-18" style={{ fontWeight: 800 }}>
                Acceptance of Terms and Conditions
              </h4>
              <p className="text-dark fs-18">
                By using the Service and the Content, you agree to follow and be
                bound by these Terms and Conditions, including the policies
                referenced herein. Customers of Itrust are granted additional
                levels of access to the website and their relationship with
                Itrust is governed by additional agreements and terms of use,
                such as the Customer Agreement.{" "}
              </p>
            </div>
            <div>
              <h4 className="fs-18" style={{ fontWeight: 800 }}>
                Disclaimer and Limitations of Liability
              </h4>
              <p className="text-dark fs-18">
                The Content and the Service are provided on an “as is” and “as
                available” basis. To the fullest extent permitted under
                applicable law, Itrust and the Third Party Providers expressly
                disclaim all warranties of any kind with respect to the Content
                and the Service, whether express or implied, including, but not
                limited to, the implied warranties of merchantability, fitness
                for a particular purpose and non-infringement. Neither Itrust
                nor Third Party Providers guarantee the accuracy, timeliness,
                completeness or usefulness of any Content. You agree to use the
                Content and the Service only at your own risk. Neither Itrust
                nor the Third Party Providers explicitly or implicitly endorse
                or approve any Third Party Content. Third Party Content is
                provided for informational purposes only.{" "}
              </p>
              <p className="text-dark fs-18">
                The Content is not intended to provide financial, legal, tax or
                investment advice or recommendations. You are solely responsible
                for determining whether any investment, investment strategy or
                related transaction is appropriate for you based on your
                personal investment objectives, financial circumstances and risk
                tolerance. You should consult your legal or tax professional
                regarding your specific situation. ITRUST AND THE THIRD PARTY
                PROVIDERS WILL NOT BE LIABLE FOR ANY DIRECT, INDIRECT,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES,
                INCLUDING, BUT NOT LIMITED TO, DAMAGES FOR LOSS OF PROFITS,
                REVENUE, INCOME, GOODWILL, USE, DATA OR OTHER INTANGIBLE LOSSES
                (EVEN IF ITRUST OR ANY THIRD PARTY PROVIDER HAS BEEN ADVISED OF
                THE POSSIBILITY OF SUCH DAMAGES), RESULTING FROM: (1) THE USE OF
                OR THE INABILITY TO USE THE CONTENT OR THE SERVICE; (2) THE COST
                OF PROCUREMENT OF SUBSTITUTE GOODS AND SERVICES RESULTING FROM
                ANY GOODS, DATA, INFORMATION OR SERVICES PURCHASED OR OBTAINED
                OR MESSAGES RECEIVED OR TRANSACTIONS ENTERED INTO, THROUGH OR
                FROM THE SERVICE; (3) ACCESS TO OR ALTERATION OF YOUR ACCOUNT,
                TRANSMISSIONS OR DATA DUE TO YOUR CONDUCT, INACTION OR
                NEGLIGENCE; OR (4) ANY OTHER MATTER RELATING TO THE CONTENT OR
                THE SERVICE.
              </p>
            </div>
            <div>
              <h4 className="fs-18" style={{ fontWeight: 800 }}>
                No Recommendations or Investment Advice
              </h4>
              <p className="text-dark fs-18">
                Itrust Investment provides self-directed investors with discount
                brokerage services, and does not make recommendations or offer
                investment advice of any kind. You are solely responsible for
                evaluating the merits and risks associated with the use of any
                Content provided through the Service before making any decisions
                based on such Content. You agree not to hold Itrust or any
                Third-Party Provider liable for any possible claim for damages
                arising from any decision you make based on the Content or other
                information made available to you through the Service or any
                Third-Party Provider websites. Past performance data should not
                be construed as indicative of future results.
              </p>
            </div>
            <TermContent />
            <Termination />
            <Communications />
            <External />
            <Applicable />
            <Indemnification />
            <Revision />
            <Law />
          </div>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Conditions;
