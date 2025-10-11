<template>
  <section class="flex size-full bg-white rounded-sm p-10 items-center justify-center">
    <div class="flex flex-col items-center gap-5">
      <h1 class="font-semibold text-2xl text-center text-primary-950">Nenhum Projeto</h1>
      <p class="text-neutral-500 font-normal text-base text-center">
        Clique no botão abaixo para criar o primeiro e gerenciá-lo.
      </p>

      <a data-testId="create-project-link" href="/create/project" class="max-w-[230px] w-full">
        <Button size="lg">
          <IconCirclePlus />
          Novo Projeto
        </Button>
      </a>
    </div>
  </section>
</template>
