import { program } from "commander";
import prompts from "prompts";
import chalk from "chalk";
import { existsSync, mkdirSync, cpSync, readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TEMPLATE_DIR = join(__dirname, "..", "template");

interface ProjectOptions {
  name: string;
}

function copyTemplateFiles(templateDir: string, targetDir: string, projectName: string) {
  const entries = readdirSync(templateDir);

  for (const entry of entries) {
    const srcPath = join(templateDir, entry);
    const destPath = join(targetDir, entry);
    const stat = statSync(srcPath);

    if (stat.isDirectory()) {
      mkdirSync(destPath, { recursive: true });
      copyTemplateFiles(srcPath, destPath, projectName);
    } else {
      let content = readFileSync(srcPath, "utf-8");
      // Replace placeholders
      content = content.replace(/{{PROJECT_NAME}}/g, projectName);
      writeFileSync(destPath, content);
    }
  }
}

async function createProject(options: ProjectOptions) {
  const { name } = options;
  const targetDir = resolve(process.cwd(), name);

  // Check if directory already exists
  if (existsSync(targetDir)) {
    console.log(chalk.red(`\nError: Directory "${name}" already exists.\n`));
    process.exit(1);
  }

  console.log(chalk.blue(`\n🚀 Creating JakeStack project: ${chalk.bold(name)}\n`));

  // Create project directory
  mkdirSync(targetDir, { recursive: true });

  // Copy template files
  console.log(chalk.gray("  Copying template files..."));
  copyTemplateFiles(TEMPLATE_DIR, targetDir, name);

  // Install dependencies
  console.log(chalk.gray("  Installing dependencies..."));
  try {
    execSync("bun install", {
      cwd: targetDir,
      stdio: "inherit",
    });
  } catch (error) {
    console.log(chalk.yellow("\n  Warning: Could not run 'bun install'. Please run it manually.\n"));
  }

  // Print success message
  console.log(chalk.green("\n✅ Project created successfully!\n"));
  console.log(chalk.white("  Next steps:\n"));
  console.log(chalk.cyan(`    cd ${name}`));
  console.log(chalk.cyan("    docker compose up -d        # Start PostgreSQL"));
  console.log(chalk.cyan("    bun run dev                 # Start dev server\n"));
  console.log(chalk.white("  Available URLs:\n"));
  console.log(chalk.gray("    Frontend:      ") + chalk.blue("http://localhost:3000"));
  console.log(chalk.gray("    API Docs:      ") + chalk.blue("http://localhost:3000/api/docs"));
  console.log(chalk.gray("    Health Check:  ") + chalk.blue("http://localhost:3000/api/health\n"));
}

async function main() {
  program
    .name("create-jakestack")
    .description("Scaffold a modern full-stack application")
    .version("1.0.0")
    .argument("[project-name]", "Name of the project to create")
    .action(async (projectName?: string) => {
      let name = projectName;

      // If no project name provided, prompt for it
      if (!name) {
        const response = await prompts({
          type: "text",
          name: "projectName",
          message: "What is your project name?",
          initial: "my-jakestack-app",
        });

        if (!response.projectName) {
          console.log(chalk.red("\nProject name is required.\n"));
          process.exit(1);
        }

        name = response.projectName;
      }

      // Validate project name
      if (!/^[a-zA-Z0-9-_]+$/.test(name)) {
        console.log(chalk.red("\nProject name can only contain letters, numbers, dashes, and underscores.\n"));
        process.exit(1);
      }

      await createProject({ name });
    });

  program.parse();
}

main().catch((error) => {
  console.error(chalk.red("Error:"), error.message);
  process.exit(1);
});
