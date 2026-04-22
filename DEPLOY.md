# DEPLOY.md — gelatincalculator.com

This is the manual checklist to get the local build onto the public internet. Work through it in order. Each section is self-contained; finish one before starting the next.

## Section 1. Push to GitHub

The repository is committed locally. It has not been pushed to any remote. Pick one of the two paths below.

**Path A — you have the `gh` CLI installed and authenticated.** From the project root, run:

```
gh repo create gelatincalculator --public --source=. --remote=origin --push
```

This creates the repo on your GitHub account, wires it up as `origin`, and pushes the current branch in a single command.

**Path B — manual.** Go to https://github.com/new. Create a new public repository named `gelatincalculator`. Do not initialize it with a README, `.gitignore`, or license — the local repo already has its own history. Once the empty repo is created, run these commands locally from the project root, replacing `USERNAME` with your GitHub username:

```
git remote add origin https://github.com/USERNAME/gelatincalculator.git
git branch -M main
git push -u origin main
```

Confirm the code now appears on github.com before moving on.

## Section 2. Connect Cloudflare Pages

1. Go to https://dash.cloudflare.com and open **Workers & Pages**.
2. Click **Create**, then open the **Pages** tab, then choose **Connect to Git**.
3. Authorize GitHub if prompted, and select the `gelatincalculator` repository you just pushed.
4. Configure the build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Root directory:** leave blank
   - **Environment variable:** add `NODE_VERSION` with value `20`
5. Click **Save and Deploy**.
6. The first build takes roughly two minutes. When it finishes, Cloudflare gives you a `*.pages.dev` preview URL. Open it and confirm the site loads.

## Section 3. Connect the custom domain

1. Inside the Cloudflare Pages project, open **Custom domains** and click **Set up a custom domain**.
2. Enter `gelatincalculator.com`. Because the domain is already registered on this Cloudflare account, Cloudflare detects it and sets the DNS records for you.
3. Add a second custom domain, `www.gelatincalculator.com`, and let it redirect to the apex.
4. Wait 1–2 minutes for SSL to provision, then open https://gelatincalculator.com in a browser. Confirm the padlock is green and the page loads over HTTPS.

## Section 4. Set up email forwarding

1. In the Cloudflare dashboard, select the `gelatincalculator.com` domain.
2. Open **Email**, then **Email Routing**, and enable it. Email Routing is free.
3. Add a custom address: `contact@gelatincalculator.com`, forwarding to your personal email.
4. Cloudflare emails a confirmation link to your destination address. Click it to verify.
5. Test the forwarding: from an outside account (not the destination address), send an email to `contact@gelatincalculator.com`. Confirm it arrives in your personal inbox.

## Section 5. Apply for Google AdSense

1. Go to https://adsense.google.com/start/.
2. Sign in with the Google account you want to associate with the property.
3. Add site: `gelatincalculator.com`.
4. Complete the payment details section. This is required to keep the account ready for payout, even before approval.
5. AdSense will provide a verification snippet. Back in the project, open `src/components/BaseHead.astro`. Replace the commented-out AdSense block near the bottom of the head with the live snippet. Update the placeholder `ca-pub-XXXXXXXXXXXXXXXX` with your actual publisher ID. Uncomment the script tag. Commit the change and push.
6. Cloudflare Pages will auto-deploy on push.
7. Back in AdSense, click **Verify**.
8. Approval typically takes 2–4 weeks. Google is checking for: real content (present), a privacy policy (present), an about page (present), working navigation (present), original material (present), and traffic patterns (these build over time).

## Section 6. Post-approval ad placement

Once AdSense approves the site:

1. Create ad units in the AdSense dashboard. Start with one or two responsive units.
2. Place the ad unit code in these two spots only: below the bloom explainer section, and between the FAQ and the footer.
3. Do not place ads above the diagnostic tool or inside the result card. That breaks the diagnostic flow and violates the PCP framing the site is built on.
4. Commit, push, done. Cloudflare Pages deploys automatically.

## Section 7. Future maintenance

1. The GitHub Action at `.github/workflows/data-validation-reminder.yml` opens an issue every six months (April 1 and October 1 at 09:00 UTC) reminding you to re-verify the bloom data.
2. When the issue appears, work through the checklist it contains, update `src/data/gelatin-bloom.json` if any value has drifted, update `last_verified`, and close the issue when done.
3. To trigger a reminder issue immediately (useful to test the workflow end-to-end after the first push), go to the repository's **Actions** tab, open **Data Validation Reminder**, and click **Run workflow**.
