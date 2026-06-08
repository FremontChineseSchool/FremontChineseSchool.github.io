# FremontChineseSchool.github.io

Fremont Chinese School website

## Per-repo Claude Code login (macOS)

On macOS, Claude Code shares one login (the macOS Keychain) across every repo.
To run this repo as the FCS account, use a `~/.zshrc` wrapper that sets an
OAuth token, which overrides the Keychain login:

- **`claude`** → your default Keychain login
- **`claude-fcs`** → the FCS account (`it@fremontchineseschool.org`)

### Setup

1. Run `claude setup-token`, sign in as the FCS account in the browser it
   opens, and copy the `sk-ant-oat-...` token.

2. Add to `~/.zshrc`:

   ```sh
   claude-fcs() { CLAUDE_CODE_OAUTH_TOKEN="sk-ant-oat-..." claude "$@"; }
   ```

3. `source ~/.zshrc`
4. Use `claude-fcs` in this repo, `claude` elsewhere.

> The greeting still shows your default account's name — it's cosmetic. To
> confirm the active account, run `claude auth status`: `"authMethod":
> "oauth_token"` means the FCS token is active.

> ⚠️ The token is a credential — keep it in `~/.zshrc`, never commit it.
