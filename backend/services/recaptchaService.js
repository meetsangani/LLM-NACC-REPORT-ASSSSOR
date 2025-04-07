const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');

/**
 * Create an assessment to analyze the risk of a UI action.
 *
 * @param {Object} params - Parameters for the assessment.
 * @param {string} params.projectID - Your Google Cloud project ID.
 * @param {string} params.recaptchaKey - The reCAPTCHA key associated with the site/app.
 * @param {string} params.token - The generated token obtained from the client.
 * @param {string} params.recaptchaAction - Action name corresponding to the token.
 * @returns {Promise<number|null>} - The risk score or null if invalid.
 */
async function createAssessment({
  projectID = "starry-antonym-358306",
  recaptchaKey = "6LeH3AorAAAAAGovWcl8lgUjh2KwSYeaAd8sdEC5",
  token = "action-token",
  recaptchaAction = "action-name",
}) {
  const client = new RecaptchaEnterpriseServiceClient();
  const projectPath = client.projectPath(projectID);

  const request = {
    assessment: {
      event: {
        token: token,
        siteKey: recaptchaKey,
      },
    },
    parent: projectPath,
  };

  const [response] = await client.createAssessment(request);

  if (!response.tokenProperties.valid) {
    console.error(`Invalid token: ${response.tokenProperties.invalidReason}`);
    return null;
  }

  if (response.tokenProperties.action === recaptchaAction) {
    console.log(`The reCAPTCHA score is: ${response.riskAnalysis.score}`);
    response.riskAnalysis.reasons.forEach((reason) => {
      console.log(reason);
    });

    return response.riskAnalysis.score;
  } else {
    console.log("The action attribute in your reCAPTCHA tag does not match the action you are expecting to score");
    return null;
  }
}

module.exports = { createAssessment };
