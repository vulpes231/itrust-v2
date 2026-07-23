import { motion } from "framer-motion";
import React from "react";
import { fadeUp } from "../../../constants/variants";
import { MdAdd, MdClose } from "react-icons/md";

const Savings = ({ currentQue, setCurrentQue }) => {
  const faqs = [
    {
      id: 1,
      question: "How do I set up automated savings account?",
      answer: `– You can set up your automated savings plan (formerly known as Autopilot) in just a couple minutes on our website. – Log into your account on our website.

          Navigate to your savings account from the header and click on create account. Select the prompt to set up an automated savings account.
          
          – Once created, Set targets for your account(s). We'll save into each account until the target is reached, then start saving in the next account you have selected.
          
          – Contribute to your savings account from your Itrust Cash Account. Then choose how much money you want to keep in that account. When its balance exceeds the set threshold by at least $100, we’ll schedule a transfer to your other accounts. – Turn on your automated savings plan.
          
          When money comes in, we’ll move it across your accounts according to your plan. You can make changes to your plan at any time.`,
    },
    {
      id: 2,
      question: "How to edit or cancel transfers with automated savings?",
      answer: `How do transfers work?

          When you create a savings account you can contribute and cash-out manually to it. When you first turn on automated savings, you set a maximum balance for your Savings Account.
          
          We'll monitor your account continuously. When we detect that you’re over your maximum by at least $100, we'll schedule a transfer of your excess cash to your other account of choice.
          
          What if my balance changes before my transfer is initiated?
          
          We'll check the balance of your source account one more time before initiating your transfer. If your balance is the same, we'll transfer the same amount.
          
          If your balance has increased, we won't increase your transfer amount and will transfer the same amount. We follow this rule so you don’t transfer more than you’re comfortable with.
          
          If your balance has decreased, we'll only transfer the remaining excess cash (the minimum transfer is $100).
          
          If we can’t connect to your source account, we'll pause your transfer.
          
          Edit your automated savings plan
          
          You can pause or edit automated savings at any time. Pausing automated savings ends all monitoring and no new transfers will be scheduled until you turn automated savings back on.`,
    },
    {
      id: 3,
      question: "How does Itrust Investment help me plan for retirement?",
      answer: `Itrust Investment financial planning experience helps estimate your net worth at retirement and what you could spend per month at that time.

          Our advice engine, compares your projected retirement income against a target spending amount that’s based on your estimated current spending and age, so you can determine whether you will be able to maintain your current lifestyle in retirement.
          
          Itrust Investment allows you to change key variables such as retirement age, planned savings, target retirement spending, and life expectancy, so you can personalize your retirement plan.`,
    },
    {
      id: 4,
      question: "What accounts are included in my retirement goal?",
      answer: `We automatically create your retirement plan using data from both Itrust Investment and external accounts you have linked.

          We use contributions from the following account types to make estimates around planned savings: 401(k), 403(b), 401(a), Thrift Savings Plan, 457(b), Traditional IRA, SIMPLE IRA, Other Non-Taxable Brokerage Accounts, SEP IRA, Depository Accounts, Checking Accounts, Savings `,
    },
    {
      id: 5,
      question: "What inputs can I change for my retirement goal?",
      answer: `You can change the following inputs in your plan and see how each affects your retirement outcome.

          Adding a spouse: Add a spouse to your retirement plan so that you can plan for retirement together. If you add a spouse, we ask your spouse’s age and income so that we can estimate Social Security benefits (in addition to your own), contribution limits and adjust tax calculations appropriately.
          
          Gender: We use this to estimate provide a suggestion on life expectancy conditional on gender.
          
          Retirement age: Alter the age at which you retire. This will affect the amount of time you save for retirement and also your Social Security benefits. Retiring earlier generally means less time to save, less time for your investments to potentially increase in value, more retirement spending and possibly less Social Security benefits.
          
          Life expectancy: Change the age at which you expect to stop needing retirement funds.
          
          Annual income for you and your spouse: The gross annual income for you and your spouse before any taxes (eg. federal, state, Social Security, Medicare), benefit deductions (eg. FSA, HSA), other withholdings or pre-tax contributions to tax-advantaged accounts such as a Roth 401(k) or HSA.
          
          Income expected in retirement aside from Social Security and investment withdrawals: The monthly value of all income you expect in retirement from sources other than Social Security and your savings. Examples are income from rental properties you own and income from defined benefit retirement plans offered by your current or previous employer.
          
          Linked accounts: Link more accounts to your plan at any time and this will generate a more comprehensive retirement income estimate. You can also change the type of a linked account to better reflect its account type in case its classification is not correct. For example, the data we obtain from your account might not be sufficient to classify it properly, in which case it might be classified as Unknown type. You can change its type to better reflect its actual type and contribution limits.
          
          Planned savings: Specify expected monthly contribution amounts toward your Itrust Investment and other linked accounts. As you change this amount, Itrust Investment provides recommendations on how to adjust your contributions across accounts. Planned savings grow with projected inflation in your plan.
          
          Because of their tax benefits, we recommend you prioritise employer-sponsored plans like 401(k) and individual retirement accounts like Roth or Traditional IRA over a taxable personal savings account. If your employer does not offer a 401(k) plan or if you cannot use tax advantaged accounts, we recommend you use a taxable personal savings account.
          
          Social Security: You can choose to include 100%, 50% or 0% of estimated social security benefits in your projection.
          
          Target retirement spending: Amount your household is expected to spend in retirement, which we automatically estimate based on linked accounts and your age.
          
          For more details on our methodology, please log into your account and review the Path disclosures.`,
    },
    {
      id: 6,
      question:
        "How does Itrust Investment help me plan for taking time off to travel?",
      answer: `We help you understand how taking extended time to travel impacts your long-term financial security. This helps you answer complex questions like how long you can travel without an income or how much you can afford to spend before your long-term security is affected.

      You input your travel scenario including duration, income, and costs. We give you an affordability rating which considers your current finances, long-term security, and your other goals. You may discover that your travel goal impacts the affordability of other goals. We’ll show you the magnitude of impact so that you can make a fully informed decision about whether -- or how -- to travel. For example, you may discover that you can afford to travel for one year if you retire three years later.
      
      We’ll show you the trade-offs -- but the decision is ultimately yours.`,
    },
    {
      id: 7,
      question: "How does Itrust Investment help me plan for college expenses?",
      answer: `Itrust Investment projects your child’s total college costs and compares them with your projected college savings and financial aid to estimate how much you’ll be able to afford by the time your child enrolls.To project the future costs, savings, and aid, we use real-world data for tuition, inflation, financial aid, and 529 investment returns.

      Itrust Investment also allows you to change key variables such as your target school and monthly college savings contributions`,
    },
  ];
  return (
    <div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: false,
        amount: 0.3,
      }}
      className="col-12 col-lg-8"
    >
      <div className="d-flex flex-column gap-3">
        {faqs.map((que) => {
          return (
            <motion.div
              key={que.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.3,
              }}
              className="d-flex flex-column bg-white  p-3 rounded-4 text-dark"
            >
              <div
                onClick={() => {
                  if (currentQue === que.id) {
                    setCurrentQue("");
                  } else {
                    setCurrentQue(que.id);
                  }
                }}
                className="d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center gap-3">
                  <span>{que.id}.</span>
                  <span className="fs-16">{que.question}</span>
                </div>
                <span>{currentQue === que.id ? <MdClose /> : <MdAdd />}</span>
              </div>
              {currentQue === que.id && (
                <p className="fs-14 text-muted fw-light px-4 mt-3">
                  {que.answer}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Savings;
