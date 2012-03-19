package com.nexse.techpjmgmt.util;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class Startup implements ApplicationListener<ContextRefreshedEvent> {

    private boolean loaded=false;

    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent event) {
/*
        if (!loaded) {
            Developer developer = new Developer();
            developer.setName("Germano");
            developer.setSurname("Giudici");
            developer.setEmail("germano.giudici@nexse.com");
            Project project = new Project();
            project.setName("PSG");
            project.setDescription("Piattaforma servizi e giochi");
            project.setPjyear(2009);
            final HashSet<Project> projects = new HashSet<Project>();
            projects.add(project);
            developer.setProjects(projects);
            developer.persist();
        }

        loaded=true;
*/
/*
        if (!loaded) {
            Project project = new Project();
            project.setName("PSG3");
            project.setDescription("Piattaforma servizi e giochi3");
            project.setPjyear(2009);
            project.persist();
        }

        loaded=true;
*/

    }
}

