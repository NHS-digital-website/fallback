<template>
  <form class="nhsd-t-form" novalidate autocomplete="off" @submit.prevent="submitForm">
    <fieldset class="nhsd-t-form-fieldset" aria-describedby="nhsd-t-form__hint">
      <form-input
          label="Bearer Token"
          hint="This is used by GitHub itself to verify that the sender has permission to make this request."
          id="bearerToken"
          :value="bearerToken"
          errorMessage="This must be a valid GitHub Bearer Token."
          :hasError="errors.bearerToken"
          @input="update('bearerToken', $event)"
      />
      <form-input
        label="Slack Signing Secret"
        hint="This is used by the GitHub Actions Workflow to verify that the sender sent the request from Slack."
        id="slackSecret"
        :value="slackSecret"
        errorMessage="This must be a valid Slack Signing Secret."
        :hasError="errors.slackSecret"
        @input="update('slackSecret', $event)"
      />
      <form-select
          label="Target Environment"
          hint="This is the ID of the target BR manged environment."
          id="environment"
          :items="environments"
          :value="environmentKey"
          errorMessage="This must be a valid Environment ID."
          :hasError="errors.environmentKey"
          @input="update('environmentKey', $event)"
      />
      <form-input
        label="branch Name"
        hint="This is the name of the Git branchName to be deployed."
        id="branchName"
        :value="branchName"
        errorMessage="This must be a valid Git branch Name."
        :hasError="errors.branchName"
        @input="update('branchName', $event)"
      />
    </fieldset>
    <button class="nhsd-a-button" type="button" @click="submitForm()">
      <span class="nhsd-a-button__label">Submit</span>
    </button>
  </form>
  <dialogue-component :outcome="outcome" v-if="outcome !== null" @click="clearOutcome" />
</template>

<script>
import { useStorage } from '@vueuse/core'
import FormInput from "./FormInput.vue";
import DialogueComponent from "./DialogueComponent.vue";
import axios from 'axios';
import FormSelect from "./FormSelect.vue";
import { guid, slackSign } from "../libs/helpers";

export default {
  components: {FormSelect, DialogueComponent, FormInput},
  data() {
    return {
      environments: [
        { id: 'C031HQR9Q0P', name: 'CS' },
        { id: 'C026PH4GQSH', name: 'Development' },
        { id: 'C0323S3FW4T', name: 'Test' },
        { id: 'C03AADPJJRY', name: 'Training' },
      ],
      environmentKey: useStorage('environmentKey', ''),
      slackSecret: useStorage('slackSecret', ''),
      branchName: useStorage('branchName', ''),
      bearerToken: useStorage('bearerToken', ''),
      errors: {
        environmentKey: false,
        slackSecret: false,
        branchName: false,
        bearerToken: false,
      },
      outcome: null,
    };
  },
  methods: {
    update(field, $event) {
      switch (field) {
        case "bearerToken":
          this.bearerToken = $event.target.value;
          this.errors.bearerToken = !this.validateBearerToken();
          break;
        case "slackSecret":
          this.slackSecret = $event.target.value;
          this.errors.slackSecret = !this.validateSlackSecret();
          break;
        case "environmentKey":
          this.environmentKey = $event.target.value;
          this.errors.environmentKey = !this.validateenvironmentKey();
          break;
        case "branchName":
          this.branchName = $event.target.value;
          this.errors.branchName = !this.validateBranchName();
          break;
      }
    },
    validateBearerToken() {
      return (this.bearerToken.length >= 40 && this.bearerToken.length <= 255 && /^gh[hprsu]_[A-Za-z0-9_]+$/.test(this.bearerToken) ? true : false);
    },
    validateSlackSecret() {
      return (this.slackSecret.length >= 32 && this.slackSecret.length <= 255 && /^[A-Za-z0-9]+$/i.test(this.slackSecret) ? true : false);
    },
    validateenvironmentKey() {
      return this.environmentKey.length > 0;
    },
    validateBranchName() {
      return ((/^[a-zA-z]{2,5}-[a-zA-Z0-9\-]+$/i.test(this.branchName) ? true : false) || this.branchName === 'master');
    },
    validateSlackChannelId() {
      return (/^[a-zA-Z0-9\-]+$/i.test(this.slackChannelId) ? true : false);
    },
    async submitForm() {
      if (this.validateBearerToken() && this.validateSlackSecret() && this.validateenvironmentKey() && this.validateBranchName() && this.validateSlackChannelId()) {

        this.appendOutcome('Starting...');

        const body = guid();
        const timestamp = Date.now();
        const signature = await slackSign(this.slackSecret, `v0:${timestamp}:${body}`);

        axios.interceptors.request.use(request => {
          this.appendOutcome('Sending request to GitHub API...')
          this.appendOutcome(JSON.stringify(request, null, 2))
          return request
        })

        axios.post('https://api.github.com/repos/NHS-digital-website/hippo/dispatches', {
          event_type: 'slack-deploy-command',
          client_payload: {
            integrity: {
              agent: 'Slackbot 1.0 (+https://api.slack.com/robots)',
              body: body,
              timestamp: timestamp,
              signature: signature,
            },
            data: {
              client_accepts_replies: false,
              channel_id: this.environmentKey,
              text: this.branchName,
            }
          }
        }, {
          headers: {
            'Authorization': `Bearer ${this.bearerToken}`,
            'Accept': 'application/vnd.github.v3+json',
          }
        }).then((response) => {
          this.appendOutcome('Response from GitHub API...')
          this.appendOutcome(JSON.stringify(response, null, 2))
        }, (error) => {
          this.appendOutcome('Error response from GitHub API...')
          this.appendOutcome(JSON.stringify(error, null, 2))
        });
      } else {
        this.errors.bearerToken = !this.validateBearerToken();
        this.errors.slackSecret = !this.validateSlackSecret();
        this.errors.environmentKey = !this.validateenvironmentKey();
        this.errors.branchName = !this.validateBranchName();
        this.errors.slackChannelId = !this.validateSlackChannelId();
        this.outcome = "Validation failed.";
      }
    },
    appendOutcome(outcome) {
      if(this.outcome === null) {
        this.outcome = "";
      }
      this.outcome += "\n" + outcome + "\n";
    },
    clearOutcome() {
      this.outcome = null;
    }
  },
};
</script>