﻿using System.Linq;
using Autofac;
using Moq;
using NHibernate;
using NUnit.Framework;
using Orchard.Caching;
using Orchard.ContentManagement.MetaData;
using Orchard.Data;
using Orchard.ContentManagement;
using Orchard.ContentManagement.Handlers;
using Orchard.ContentManagement.Records;
using Orchard.DisplayManagement;
using Orchard.DisplayManagement.Descriptors;
using Orchard.Environment.Configuration;
using Orchard.Environment.Extensions;
using Orchard.Tests.ContentManagement.Handlers;
using Orchard.Tests.ContentManagement.Records;
using Orchard.Tests.ContentManagement.Models;
using Orchard.DisplayManagement.Implementation;
using Orchard.Tests.Stubs;
using Orchard.UI.PageClass;

namespace Orchard.Tests.ContentManagement {
    [TestFixture]
    public class DynamicContentQueryTests {
        private IContainer _container;
        private IContentManager _manager;
        private ISessionFactory _sessionFactory;
        private ISession _session;

        [TestFixtureSetUp]
        public void InitFixture() {
            var databaseFileName = System.IO.Path.GetTempFileName();
            _sessionFactory = DataUtility.CreateSessionFactory(
                databaseFileName,
                typeof(GammaRecord),
                typeof(DeltaRecord),
                typeof(EpsilonRecord),
                typeof(ContentItemVersionRecord),
                typeof(ContentItemRecord),
                typeof(ContentTypeRecord));
        }

        [SetUp]
        public void Init() {
            var builder = new ContainerBuilder();

            builder.RegisterModule(new ContentModule());
            builder.RegisterType<DefaultContentManager>().As<IContentManager>().SingleInstance();
            builder.RegisterType<StubCacheManager>().As<ICacheManager>();
            builder.RegisterType<Signals>().As<ISignals>();
            builder.RegisterType<DefaultContentManagerSession>().As<IContentManagerSession>();
            builder.RegisterInstance(new Mock<IContentDefinitionManager>().Object);
            builder.RegisterInstance(new Mock<IContentDisplay>().Object);
            builder.RegisterInstance(new ShellSettings { Name = ShellSettings.DefaultName, DataProvider = "SqlCe" });

            builder.RegisterType<AlphaPartHandler>().As<IContentHandler>();
            builder.RegisterType<BetaPartHandler>().As<IContentHandler>();
            builder.RegisterType<GammaPartHandler>().As<IContentHandler>();
            builder.RegisterType<DeltaPartHandler>().As<IContentHandler>();
            builder.RegisterType<EpsilonPartHandler>().As<IContentHandler>();
            builder.RegisterType<FlavoredPartHandler>().As<IContentHandler>();
            builder.RegisterType<StyledHandler>().As<IContentHandler>();
            builder.RegisterType<DefaultShapeTableManager>().As<IShapeTableManager>();
            builder.RegisterType<ShapeTableLocator>().As<IShapeTableLocator>();
            builder.RegisterType<DefaultShapeFactory>().As<IShapeFactory>();

            builder.RegisterGeneric(typeof(Repository<>)).As(typeof(IRepository<>));

            builder.RegisterType<StubExtensionManager>().As<IExtensionManager>();
            builder.RegisterInstance(new Mock<IPageClassBuilder>().Object); 
            builder.RegisterType<DefaultContentDisplay>().As<IContentDisplay>();

            _session = _sessionFactory.OpenSession();
            builder.RegisterInstance(new TestTransactionManager(_session)).As<ITransactionManager>();

            _session.Delete(string.Format("from {0}", typeof(GammaRecord).FullName));
            _session.Delete(string.Format("from {0}", typeof(DeltaRecord).FullName));
            _session.Delete(string.Format("from {0}", typeof(EpsilonRecord).FullName));
            _session.Delete(string.Format("from {0}", typeof(ContentItemVersionRecord).FullName));
            _session.Delete(string.Format("from {0}", typeof(ContentItemRecord).FullName));
            _session.Delete(string.Format("from {0}", typeof(ContentTypeRecord).FullName));
            _session.Flush();
            _session.Clear();

            _container = builder.Build();
            _manager = _container.Resolve<IContentManager>();

        }

        [TearDown]
        public void Cleanup() {
            if (_container != null)
                _container.Dispose();
        }

        private void AddSampleData() {
            _manager.Create<AlphaPart>("alpha", init => { });
            _manager.Create<BetaPart>("beta", init => { });
            _manager.Create<GammaPart>("gamma", init => { init.Record.Frap = "the frap value"; });
            _manager.Create<DeltaPart>("delta", init => { init.Record.Quux = "the quux value"; });
            _session.Flush();
        }

        [Test]
        public void SpecificTypeIsReturnedWhenSpecified() {
            AddSampleData();

            var alphaBeta = _manager.HqlQuery().ForType("alpha", "beta").List();

            Assert.That(alphaBeta.Count(), Is.EqualTo(2));
            Assert.That(alphaBeta.Count(x => x.Has<AlphaPart>()), Is.EqualTo(1));
            Assert.That(alphaBeta.Count(x => x.Has<BetaPart>()), Is.EqualTo(1));
            Assert.That(alphaBeta.Count(x => x.Has<GammaPart>()), Is.EqualTo(0));
            Assert.That(alphaBeta.Count(x => x.Has<DeltaPart>()), Is.EqualTo(0));

            var gammaDelta = _manager.HqlQuery().ForType("gamma", "delta").List();

            Assert.That(gammaDelta.Count(), Is.EqualTo(2));
            Assert.That(gammaDelta.Count(x => x.Has<AlphaPart>()), Is.EqualTo(0));
            Assert.That(gammaDelta.Count(x => x.Has<BetaPart>()), Is.EqualTo(0));
            Assert.That(gammaDelta.Count(x => x.Has<GammaPart>()), Is.EqualTo(1));
            Assert.That(gammaDelta.Count(x => x.Has<DeltaPart>()), Is.EqualTo(1));
        }

        [Test]
        public void WherePredicateRestrictsResults() {
            AddSampleData();
            _manager.Create<GammaPart>("gamma", init => { init.Record.Frap = "one"; });
            _manager.Create<GammaPart>("gamma", init => { init.Record.Frap = "two"; });
            _manager.Create<GammaPart>("gamma", init => { init.Record.Frap = "three"; });
            _manager.Create<GammaPart>("gamma", init => { init.Record.Frap = "four"; });
            _session.Flush();

            var twoOrFour = _manager
                .HqlQuery()
                .Where(
                    alias => alias.ContentPartRecord<GammaRecord>(), 
                    x => x.Or(a => a.Eq("Frap", "one"), b => b.Eq("Frap", "four")))
                .List();

            Assert.That(twoOrFour.Count(), Is.EqualTo(2));
            Assert.That(twoOrFour.Count(x => x.Has<GammaPart>()), Is.EqualTo(2));
            Assert.That(twoOrFour.Count(x => x.Get<GammaPart>().Record.Frap == "one"), Is.EqualTo(1));
            Assert.That(twoOrFour.Count(x => x.Get<GammaPart>().Record.Frap == "four"), Is.EqualTo(1));
        }


        [Test]
        public void EmptyWherePredicateRequiresRecord() {
            AddSampleData();
            var gammas = _manager.HqlQuery().Join(alias => alias.ContentPartRecord<GammaRecord>()).List();
            var deltas = _manager.HqlQuery().Join(alias => alias.ContentPartRecord<DeltaRecord>()).List();

            Assert.That(gammas.Count(), Is.EqualTo(1));
            Assert.That(deltas.Count(), Is.EqualTo(1));
            Assert.That(gammas.AsPart<GammaPart>().Single().Record.Frap, Is.EqualTo("the frap value"));
            Assert.That(deltas.AsPart<DeltaPart>().Single().Record.Quux, Is.EqualTo("the quux value"));
        }

        [Test]
        public void OrderMaySortOnJoinedRecord() {
            AddSampleData();
            _manager.Create<GammaPart>("gamma", init => { init.Record.Frap = "one"; });
            _manager.Create<GammaPart>("gamma", init => { init.Record.Frap = "two"; });
            _manager.Create<GammaPart>("gamma", init => { init.Record.Frap = "three"; });
            _manager.Create<GammaPart>("gamma", init => { init.Record.Frap = "four"; });
            _session.Flush();
            _session.Clear();

            var ascending = _manager.HqlQuery<GammaPart>()
                .ForType("gamma")
                .OrderBy(alias => alias.ContentPartRecord<GammaRecord>(), x => x.Asc("Frap"))
                .List().ToList();

            Assert.That(ascending.Count(), Is.EqualTo(5));
            Assert.That(ascending.First().Record.Frap, Is.EqualTo("four"));
            Assert.That(ascending.Last().Record.Frap, Is.EqualTo("two"));

            _session.Clear();

            var descending = _manager.HqlQuery<GammaPart>()
                .ForType("gamma")
                .OrderBy(alias => alias.ContentPartRecord<GammaRecord>(), x => x.Desc("Frap"))
                .List().ToList();

            Assert.That(descending.Count(), Is.EqualTo(5));
            Assert.That(descending.First().Record.Frap, Is.EqualTo("two"));
            Assert.That(descending.Last().Record.Frap, Is.EqualTo("four"));
        }

        [Test]
        public void SkipAndTakeProvidePagination() {
            AddSampleData();
            _manager.Create<GammaPart>("gamma", init => { init.Record.Frap = "one"; });
            _manager.Create<GammaPart>("gamma", init => { init.Record.Frap = "two"; });
            _manager.Create<GammaPart>("gamma", init => { init.Record.Frap = "three"; });
            _manager.Create<GammaPart>("gamma", init => { init.Record.Frap = "four"; });
            _session.Flush();

            var reverseById = _manager.HqlQuery()
                .OrderBy(alias => alias.ContentPartRecord<GammaRecord>(), x => x.Desc("Id"))
                .List();

            var subset = _manager.HqlQuery()
                .OrderBy(alias => alias.ContentPartRecord<GammaRecord>(), x => x.Desc("Id"))
                .Slice(2, 3);

            Assert.That(subset.Count(), Is.EqualTo(3));
            Assert.That(subset.First().Id, Is.EqualTo(reverseById.Skip(2).First().Id));
            Assert.That(subset.Skip(1).First().Id, Is.EqualTo(reverseById.Skip(3).First().Id));
            Assert.That(subset.Skip(2).First().Id, Is.EqualTo(reverseById.Skip(4).First().Id));
        }


        [Test]
        public void QueryShouldJoinVersionedRecords() {
            AddSampleData();
            _manager.Create<GammaPart>("gamma", init => {
                init.Record.Frap = "one";
                init.As<EpsilonPart>().Record.Quad = "1";
            });
            _manager.Create<GammaPart>("gamma", init => {
                init.Record.Frap = "two";
                init.As<EpsilonPart>().Record.Quad = "2";
            });
            _manager.Create<GammaPart>("gamma", init => {
                init.Record.Frap = "three";
                init.As<EpsilonPart>().Record.Quad = "3";
            });
            _manager.Create<GammaPart>("gamma", init => {
                init.Record.Frap = "four";
                init.As<EpsilonPart>().Record.Quad = "4";
            });
            _session.Flush();
            _session.Clear();

            var results = _manager.HqlQuery<EpsilonPart>()
                .Where(alias => alias.ContentPartRecord<EpsilonRecord>(), x => x.Or(a => a.Eq("Quad", "2"), b => b.Eq("Quad", "3")))
                .OrderBy(alias => alias.ContentPartRecord<EpsilonRecord>(), x => x.Desc("Quad"))
                .ForType("gamma")
                .List();

            Assert.That(results.Count(), Is.EqualTo(2));
            Assert.That(results.First().Record, Has.Property("Quad").EqualTo("3"));
            Assert.That(results.Last().Record, Has.Property("Quad").EqualTo("2"));
        }


    }
}