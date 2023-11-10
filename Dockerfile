FROM denoland/deno

EXPOSE 8000

WORKDIR /

USER deno

COPY . .

CMD ["run", "--allow-net", "--allow-env","--allow-read", "index.ts"]