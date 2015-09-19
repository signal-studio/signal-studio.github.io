
#
# Binaries
#
BIN := ./node_modules/.bin

#
# Variables
#

PORT    = 8080

SOURCE  = ./source
BUILD   = ./build

STYLES  = $(shell find $(SOURCE)/css -type f -name '*.scss')
SCRIPTS = $(shell find $(SOURCE)/js -type f -name '*.js' -o -name '*.html')

DOMAIN  = signal.to
REPO    = signal-studio/signal-studio.github.io
BRANCH  = $(shell git rev-parse --abbrev-ref HEAD)

#
# Tasks
#

build: node_modules assets scripts styles

develop:
	@serve $(BUILD) -p $(PORT)

deploy:
	@echo "Deploying branch \033[0;33m$(BRANCH)\033[0m to Github pages..."
	@make clean
	@NODE_ENV=production make build
	@(cd $(BUILD) && \
		git init -q .  && \
		git add . && \
		git commit -q -m "Deployment (auto-commit)" && \
		echo "\033[0;90m" && \
		git push "git@github.com:$(REPO).git" HEAD:master --force && \
		echo "\033[0m")
	@make clean
	@echo "Deployed to \033[0;32mhttp://$(DOMAIN)\033[0m"

clean:
	@rm -rf $(BUILD)

clean-deps:
	@rm -rf node_modules

#
# Shorthands
#

install: node_modules
assets: build/index.html build/assets/ping.mp3
scripts: build/assets/index.js
styles: build/assets/styles.css

#
# Targets
#

node_modules: package.json
	@npm install


$(BUILD)/assets/%: $(SOURCE)/assets/%
	@mkdir -p $(@D)
	@cp $< $@

$(BUILD)/%: $(SOURCE)/%
	@mkdir -p $(@D)
	@cp $< $@

# Compile scripts with Duo
$(BUILD)/assets/index.js: $(SCRIPTS)
	@mkdir -p $(@D)
	@browserify $(SOURCE)/js/index.js -t babelify -t partialify > $@

# Compile styles with sass
$(BUILD)/assets/styles.css: $(STYLES)
	@mkdir -p $(@D)
	@sassc --sourcemap --load-path $(SOURCE)/css/ $(SOURCE)/css/styles.scss $@
	@autoprefixer $@ --clean --browsers "last 2 versions"

.PHONY: all build clean assets scripts styles
