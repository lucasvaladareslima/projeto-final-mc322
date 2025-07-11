# Generated by Django 5.2.3 on 2025-06-23 19:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Publicacao',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=200)),
                ('conteudo', models.TextField()),
                ('data_criacao', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Comentario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('conteudo', models.TextField()),
                ('data_criacao', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['data_criacao'],
            },
        ),
        migrations.CreateModel(
            name='Disciplina',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100, unique=True)),
                ('codigo', models.CharField(blank=True, max_length=20, null=True, unique=True)),
                ('descricao', models.TextField(blank=True, null=True)),
                ('creditos', models.PositiveIntegerField(default=0)),
            ],
            options={
                'verbose_name': 'Disciplina',
                'verbose_name_plural': 'Disciplinas',
            },
        ),
        migrations.CreateModel(
            name='EntregaTarefa',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('conteudo', models.TextField()),
                ('arquivo', models.FileField(blank=True, help_text='Arquivo enviado pelo aluno como entrega da tarefa.', null=True, upload_to='entregas_tarefas/')),
                ('data_entrega', models.DateTimeField(auto_now_add=True)),
                ('nota_obtida', models.DecimalField(blank=True, decimal_places=2, help_text='Nota da entrega, se aplicável.', max_digits=5, null=True)),
            ],
            options={
                'verbose_name': 'Entrega de Tarefa',
                'verbose_name_plural': 'Entregas de Tarefas',
            },
        ),
        migrations.CreateModel(
            name='Forum',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(default='Fórum de Discussão', max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='PeriodoLetivo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ano', models.PositiveIntegerField()),
                ('semestre', models.IntegerField(choices=[(1, '1º Semestre'), (2, '2º Semestre')])),
            ],
            options={
                'verbose_name': 'Período Letivo',
                'verbose_name_plural': 'Períodos Letivos',
            },
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=200)),
                ('conteudo', models.TextField()),
                ('data_criacao', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['-data_criacao'],
            },
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(help_text='Nome da tag, ex: Dúvida de Conteúdo', max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Turma',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100, unique=True)),
            ],
            options={
                'verbose_name': 'Turma',
                'verbose_name_plural': 'Turmas',
            },
        ),
        migrations.CreateModel(
            name='Anuncio',
            fields=[
                ('publicacao_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='ensino.publicacao')),
            ],
            options={
                'verbose_name': 'Anúncio',
                'verbose_name_plural': 'Anúncios',
            },
            bases=('ensino.publicacao',),
        ),
        migrations.CreateModel(
            name='Material',
            fields=[
                ('publicacao_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='ensino.publicacao')),
                ('arquivo', models.FileField(upload_to='materiais/')),
            ],
            options={
                'verbose_name': 'Material',
                'verbose_name_plural': 'Materiais',
            },
            bases=('ensino.publicacao',),
        ),
        migrations.CreateModel(
            name='Tarefa',
            fields=[
                ('publicacao_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='ensino.publicacao')),
                ('data_entrega', models.DateTimeField()),
                ('nota_maxima', models.DecimalField(decimal_places=2, default=10.0, help_text='Nota máxima da tarefa.', max_digits=5)),
            ],
            options={
                'verbose_name': 'Tarefa',
                'verbose_name_plural': 'Tarefas',
            },
            bases=('ensino.publicacao',),
        ),
    ]
