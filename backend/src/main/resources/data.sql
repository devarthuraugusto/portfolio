INSERT INTO projects (id, name, name_en, description, description_en, technologies, repository_url, image_url, start_date) VALUES
/*(1, 'Sistema de Gestão Acadêmica', 'Aplicação para acompanhamento de notas e frequência de turmas.', 'React,Spring Boot,H2', 'https://github.com/devarthuraugusto/portfolio', 'https://placehold.co/800x450/111111/FFD600?text=Gestao+Academica', '2025-03-10');*/
(1, 'Portfólio devArthur', 'devArthur Portfolio', 'Front-end React consumindo uma API REST em Spring Boot.', 'React front-end consuming a Spring Boot REST API.', 'React,Spring Boot,Mantine,Vite', 'https://github.com/devarthuraugusto/portfolio', '/fontes/portfolio.png', '2026-02-15');

INSERT INTO experiences (id, organization, role, role_en, start_date, end_date, description, description_en, logo_index) VALUES
(1, 'ASSPROM - Associação Profissionalizante do Menor', 'Jovem Aprendiz', 'Apprentice', '2022-05-01', '2024-12-01', 'Organização de escritório, telefonia e gestão de planilhas.', 'Office organization, telephone service and spreadsheet management.', 1),
(2, 'FIT Economia de Energia', 'Auxiliar de Operações', 'Operations Assistant', '2025-01-07', '2025-09-01', 'Verificação de documentos e comunicação com o time de tecnologia.', 'Document verification and communication with the technology team.', 2),
(3, 'PUC Minas', 'Monitor de AEDS I', 'Algorithms and Data Structures I Teaching Assistant', '2026-09-01', NULL, 'Auxílio aos alunos em dúvidas sobre a disciplina de Algoritmos e Estruturas de Dados I.', 'Helping students with questions about Algorithms and Data Structures I.', 3);
