package org.example.oblig_3;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;


@RestController
public class controller {

    @Autowired
    org.example.oblig_3.bilettRepository rep;

    @Autowired
    private JdbcTemplate db;



    @PostMapping("/lagre")
    public void save(org.example.oblig_3.bilettLagring billett) {
        rep.lagreBillett(billett);
    }
    @GetMapping("/hentBilletter")
    public List<org.example.oblig_3.bilettLagring> getBillettListe() {
        return rep.hentAlleBilletter();
    }

    @PostMapping ("/slettAlt")
    public void slettArray(){
        rep.slettAlleBilletter();
    }

    @PostMapping ("/slettBilett")
    public void slettBilett(Integer id){
        rep.slettBillett(id);
    }
    @GetMapping("/hentEnBillett")
    public org.example.oblig_3.bilettLagring hentEnBillett(Integer id){
        return rep.hentEnBillett(id);
    }

    @PostMapping("/oppdaterBillett")
    public void oppdaterBillett(@RequestBody org.example.oblig_3.bilettLagring oppdatertBillett){
        rep.oppdaterBillett(oppdatertBillett);
    }

}
